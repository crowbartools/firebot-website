import NodeCache from 'node-cache';
import { TwitchUser } from '../types/twitch';
import { getStreams, getUsers } from './twitch-api';
import { getAdminSettings } from './admin-settings';
import { AdminSettings } from '../types/admin';
import { people } from '../constants/people';
import * as db from './db';

const THIRTY_MINS_IN_SECONDS = 1800;
const FIFTEEN_MINS_IN_SECONDS = 900;
const FIVE_MINS_IN_SECONDS = 300;

type CacheEntry = {
    addedAt: number;
    userData: TwitchUser;
};

const channelCache = new NodeCache({
    stdTTL: THIRTY_MINS_IN_SECONDS,
    checkperiod: 30,
    useClones: false,
});

async function persistCacheKeysToDb() {
    const query = `
    insert into persisted_cache (name, keys)
    values ($1, $2)
    on conflict (name)
        do update set name = EXCLUDED.name,
                    keys = EXCLUDED.keys;
    `;
    await db.query(query, ['liveChannels', channelCache.keys()]);
}

function validateChannelAndCategory(
    {
        blacklistedChannelIds,
        blacklistedStreamCategoryIds,
        blacklistedTags,
    }: AdminSettings,
    channelId: string,
    categoryName: string,
    streamTags: string[]
) {
    if (blacklistedChannelIds.includes(channelId)) {
        return false;
    }

    if (blacklistedStreamCategoryIds.includes(categoryName)) {
        return false;
    }

    if (
        streamTags.some((t) => blacklistedTags.includes(t?.toLowerCase() ?? ''))
    ) {
        return false;
    }

    return true;
}

export async function addLiveChannel(
    channelId: string
): Promise<{ success: boolean; error?: string }> {
    const existing = channelCache.get<CacheEntry>(channelId);
    // If the channel is already in the cache and it was added less than 15 minutes ago, return an error
    if (
        existing &&
        (Date.now() - existing.addedAt) / 1000 < FIFTEEN_MINS_IN_SECONDS
    ) {
        return {
            success: false,
            error: `Channel ${channelId} recently put in cache`,
        };
    }

    const response = await getUsers([channelId], true);
    const userData = response[channelId];
    if (!userData || !userData.stream) {
        return {
            success: false,
            error: `Channel ${channelId} not found or not live`,
        };
    }

    const adminSettings = await getAdminSettings();
    if (
        !validateChannelAndCategory(
            adminSettings,
            channelId,
            userData.stream.game_name,
            userData.stream.tags
        )
    ) {
        // silently ignore blacklisted channels/categories
        return {
            success: true,
        };
    }

    const matchedTeamMember = people.find(
        (member) => member.id === userData.id && member.isTeamMember
    );
    userData.isTeamMember = matchedTeamMember != null;
    userData.teamMemberRole = matchedTeamMember?.generalizedRole;

    channelCache.set<CacheEntry>(
        channelId,
        { addedAt: Date.now(), userData },
        THIRTY_MINS_IN_SECONDS
    );

    persistCacheKeysToDb();

    return { success: true };
}

const PAGE_SIZE = 20;

export function getLiveChannels(page: number) {
    if (page < 1) {
        page = 1;
    }

    const channels = Object.values(
        channelCache.mget<CacheEntry>(channelCache.keys())
    )
        .map((c) => c.userData)
        .sort((a, b) =>
            a.isTeamMember != b.isTeamMember
                ? a.isTeamMember
                    ? -1
                    : 1
                : new Date(b.stream.started_at).getTime() -
                  new Date(a.stream.started_at).getTime()
        );

    const offset = (page - 1) * PAGE_SIZE;
    const channelsForPage = channels.slice(offset, offset + PAGE_SIZE);

    const remaining = Math.max(channels.length - offset - PAGE_SIZE, 0);

    return {
        channels: channelsForPage,
        page,
        remaining,
        total: channels.length,
    };
}

export async function validateCache() {
    const channelIds = channelCache.keys();
    if (channelIds.length === 0) {
        return;
    }

    const streams = await getStreams(channelIds);
    const adminSettings = getAdminSettings();

    for (const channelId of channelIds) {
        const existing = channelCache.get<CacheEntry>(channelId);
        if (!existing) {
            continue;
        }
        const stream = streams[channelId];
        if (
            stream &&
            validateChannelAndCategory(
                adminSettings,
                channelId,
                stream.game_name,
                stream.tags
            )
        ) {
            existing.userData.stream = stream;
        } else {
            channelCache.del(channelId);
        }
    }

    persistCacheKeysToDb();
}

(async () => {
    const result = await db.query(
        'SELECT keys FROM persisted_cache where name = $1',
        ['liveChannels']
    );
    if (!result) return;
    const keys: string[] = result.rows[0]?.keys ?? [];
    for (const channelId of keys) {
        await addLiveChannel(channelId);
    }
})();

// every 5 minutes, check ensure channels are still live and update the cache
setInterval(validateCache, FIVE_MINS_IN_SECONDS * 1000);
