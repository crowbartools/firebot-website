import axios from 'axios';
import { TwitchUser } from '../types/twitch';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useLiveChannels = (filterAndSort?: {
    sortBy?: 'stream_uptime' | 'viewers';
    sortDirection?: 'asc' | 'desc';
    search?: string;
    language?: string;
    category?: string;
    mature?: boolean;
}) => {
    return useInfiniteQuery({
        queryKey: ['live-channels'],
        refetchInterval: 1000 * 60 * 5, // 5 minutes
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await axios.get<{
                channels: TwitchUser[];
                page: number;
                remaining: number;
                total: number;
            }>('/api/live-now', {
                params: {
                    page: pageParam,
                    ...(filterAndSort ?? {}),
                },
            });
            await wait(750);
            return data;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.remaining > 0 ? lastPage.page + 1 : undefined,
    });
};

export const useLiveChannelCount = () => {
    return useQuery({
        queryKey: ['live-channels-count'],
        refetchInterval: 1000 * 60 * 5, // 5 minutes
        queryFn: async () => {
            const { data } = await axios.get<{
                total: number;
            }>('/api/live-now', {
                params: {
                    page: 1,
                },
            });
            return data?.total ?? 0;
        },
    });
};
