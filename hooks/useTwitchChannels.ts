import axios from 'axios';
import { TwitchChannel } from '../types/twitch';
import { useQuery } from '@tanstack/react-query';

export const useTwitchChannels = (query?: string) => {
    return useQuery({
        queryKey: ['channels', query],
        queryFn: async () => {
            const { data } = await axios.get<TwitchChannel[]>(
                '/api/admin/channels',
                {
                    params: {
                        query,
                    },
                }
            );
            return data;
        },
    });
};
