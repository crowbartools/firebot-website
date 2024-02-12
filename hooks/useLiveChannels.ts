import axios from 'axios';
import { TwitchUser } from '../types/twitch';
import { useInfiniteQuery } from '@tanstack/react-query';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useLiveChannels = () => {
    return useInfiniteQuery({
        queryKey: ['live-channels'],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await axios.get<{
                channels: TwitchUser[];
                page: number;
                remaining: number;
                total: number;
            }>('/api/live-now', {
                params: {
                    page: pageParam,
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
