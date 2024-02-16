import { JsonDB, Config } from 'node-json-db';
import { AdminSettings } from '../types/admin';

const defaultSettings: AdminSettings = {
    blacklistedChannelIds: [],
    blacklistedStreamCategoryIds: [],
    blacklistedTags: [],
};

const db = new JsonDB(new Config('admin-settings', true, false, '/'));

export const getAdminSettings = async (): Promise<AdminSettings> => {
    const current = await db.getData('/');
    return { ...defaultSettings, ...current };
};

export const patchAdminSettings = async (
    newSettings: Partial<AdminSettings>
): Promise<AdminSettings> => {
    const currentSettings = await getAdminSettings();
    const updatedSettings = { ...currentSettings, ...newSettings };
    await db.push('/', updatedSettings);
    return updatedSettings;
};
