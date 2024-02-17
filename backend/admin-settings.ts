import { AdminSettings } from '../types/admin';
import * as db from './db';

const defaultSettings: AdminSettings = {
    blacklistedChannelIds: [],
    blacklistedStreamCategoryIds: [],
    blacklistedTags: [],
};

let currentSettings: AdminSettings = { ...defaultSettings };

(async () => {
    const res = await db.query('SELECT * FROM admin_setting');
    if (!res) return;
    const settings = res.rows.reduce((acc, row) => {
        acc[row.key] = row.values ?? [];
        return acc;
    }, {});
    currentSettings = { ...defaultSettings, ...settings };
})();

export const getAdminSettings = (): AdminSettings => {
    return currentSettings;
};

export const patchAdminSettings = async (
    newSettings: Partial<AdminSettings>
): Promise<AdminSettings> => {
    const values = Object.keys(newSettings).map((_, i) => {
        const rowIndex = i + 1;
        const firstParamNum = rowIndex + i;
        return `($${firstParamNum}, $${firstParamNum + 1})`;
    });

    const query = `
    insert into admin_setting (key, values)
        values
            ${values.join(',')}
    on conflict (key)
        do update set
        key = EXCLUDED.key,
        values = EXCLUDED.values;
    `;

    const result = await db.query(query, Object.entries(newSettings).flat());
    if (!result) {
        return currentSettings;
    }

    currentSettings = { ...currentSettings, ...newSettings };

    return currentSettings;
};
