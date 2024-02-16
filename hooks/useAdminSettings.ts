import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { AdminSettings } from '../types/admin';

export const useAdminSettings = () => {
    return useQuery({
        queryKey: ['admin-settings'],
        queryFn: async () => {
            const { data } = await axios.get<AdminSettings>(
                '/api/admin/settings'
            );
            return data;
        },
    });
};
