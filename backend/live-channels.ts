import NodeCache from 'node-cache';
import { TwitchUser } from '../types/twitch';
import { getStreams, getUsers, searchCategories } from './twitch-api';
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

type SortByType<T extends string> = T | `${T}:${'asc' | 'desc'}`;

export type ChannelSortBy = SortByType<
    'viewers' | 'stream_uptime' | 'language'
>;
export async function getLiveChannels(
    page: number,
    sortBy: ChannelSortBy[] = ['language:desc', 'stream_uptime:asc'],
    sortLanguages: string[] = [],
    filters?: {
        search?: string;
        language?: string[];
        category?: string[];
        mature?: boolean;
    }
) {
    if (page < 1) {
        page = 1;
    }

    if (filters?.language?.length) {
        sortLanguages = filters.language;
    }

    const allChannels = Object.values(
        channelCache.mget<CacheEntry>(channelCache.keys())
    ).map((c) => c.userData);

    let channels = allChannels.sort((a, b) => {
        if (a.isTeamMember != b.isTeamMember) {
            return a.isTeamMember ? -1 : 1;
        }
        for (const sortByItem of sortBy) {
            // eslint-disable-next-line prefer-const
            let [sortByKey, sortDirection] = sortByItem.split(':');
            if (sortDirection == null) {
                sortDirection = 'asc';
            }

            if (sortByKey === 'language') {
                const aLang = a.stream.language;
                const bLang = b.stream.language;
                const aIndex = sortLanguages.indexOf(aLang);
                const bIndex = sortLanguages.indexOf(bLang);
                if (aIndex === bIndex) {
                    continue;
                }
                if (aIndex === -1) {
                    return 1;
                }
                if (bIndex === -1) {
                    return -1;
                }
                return sortDirection === 'asc'
                    ? bIndex - aIndex
                    : aIndex - bIndex;
            }

            if (sortByKey === 'stream_uptime') {
                return sortDirection === 'asc'
                    ? new Date(b.stream.started_at).getTime() -
                          new Date(a.stream.started_at).getTime()
                    : new Date(a.stream.started_at).getTime() -
                          new Date(b.stream.started_at).getTime();
            }

            if (sortByKey === 'viewers') {
                return sortDirection === 'asc'
                    ? a.stream.viewer_count - b.stream.viewer_count
                    : b.stream.viewer_count - a.stream.viewer_count;
            }
        }
        return 0;
    });

    if (filters != null && Object.values(filters).some((f) => f != null)) {
        const categoryIds: string[] = [];
        if (filters.category != null) {
            for (const categoryIdOrName of filters.category) {
                // if the category filter is a number, treat as a category id
                if (!isNaN(parseInt(categoryIdOrName))) {
                    categoryIds.push(categoryIdOrName);
                } else {
                    // otherwise, search categories by name
                    const categories = await searchCategories(categoryIdOrName);
                    if (categories?.[0]?.id) {
                        categoryIds.push(categories[0].id);
                    }
                }
            }
        }
        channels = channels.filter((c) => {
            if (
                filters.language != null &&
                !filters.language.includes(c.stream.language)
            ) {
                return false;
            }
            if (
                categoryIds?.length &&
                !categoryIds.includes(c.stream.game_id)
            ) {
                return false;
            }
            if (
                filters.mature != null &&
                c.stream.is_mature !== filters.mature
            ) {
                return false;
            }
            if (
                filters.search != null &&
                !(
                    c.display_name
                        .toLowerCase()
                        .includes(filters.search.toLowerCase().trim()) ||
                    c.stream.title
                        .toLowerCase()
                        .includes(filters.search.toLowerCase().trim()) ||
                    c.stream.tags.some(
                        (t) =>
                            t
                                .toLowerCase()
                                .includes(
                                    filters.search.toLowerCase().trim()
                                ) ||
                            c.stream.game_name
                                .toLowerCase()
                                .includes(filters.search.toLowerCase().trim())
                    )
                )
            ) {
                return false;
            }
            return true;
        });
    }

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

export async function getRandomLiveChannel() {
    const allChannels = Object.values(
        channelCache.mget<CacheEntry>(channelCache.keys())
    ).map((c) => c.userData);

    return allChannels[Math.floor(Math.random() * allChannels.length)];
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
