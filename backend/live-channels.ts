import NodeCache from 'node-cache';
import { TwitchUser } from '../types/twitch';
import { getStreams, getUsers } from './twitch-api';

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

    channelCache.set<CacheEntry>(
        channelId,
        { addedAt: Date.now(), userData },
        THIRTY_MINS_IN_SECONDS
    );

    return { success: true };
}

const PAGE_SIZE = 20;

export function getLiveChannels(page: number) {
    if (page < 1) {
        page = 1;
    }

    const channels = Object.values(
        channelCache.mget<CacheEntry>(channelCache.keys())
    ).map((c) => c.userData);

    // apply sorting?

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

// every 5 minutes, check ensure channels are still live and update the cache
setInterval(async () => {
    const channelIds = channelCache.keys();
    if (channelIds.length === 0) {
        return;
    }

    const streams = await getStreams(channelIds);

    for (const channelId of channelIds) {
        const existing = channelCache.get<CacheEntry>(channelId);
        if (!existing) {
            continue;
        }
        const stream = streams[channelId];
        if (stream) {
            existing.userData.stream = stream;
        } else {
            channelCache.del(channelId);
        }
    }
}, FIVE_MINS_IN_SECONDS * 1000);
