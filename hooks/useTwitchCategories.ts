import axios from 'axios';
import { TwitchCategory } from '../types/twitch';
import { useQuery } from '@tanstack/react-query';

export const useTwitchCategories = (query?: string) => {
    return useQuery({
        queryKey: ['categories', query],
        queryFn: async () => {
            const { data } = await axios.get<TwitchCategory[]>(
                '/api/admin/categories',
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
