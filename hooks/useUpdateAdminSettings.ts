import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AdminSettings } from '../types/admin';

export const useUpdateAdminSettings = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (settings: Partial<AdminSettings>) => {
            await queryClient.cancelQueries({ queryKey: ['admin-settings'] });

            
            const { data } = await axios.patch<AdminSettings>(
                '/api/admin/settings',
                settings
            );

            await new Promise((resolve) => setTimeout(resolve, 750));
            
            return data;
        },
        onSuccess: (newSettings) => {
            queryClient.setQueryData(['admin-settings'], () => newSettings);
            queryClient.invalidateQueries({ queryKey: ['admin-settings'] });
        },
    });
};
