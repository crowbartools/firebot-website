import { NextApiRequest, NextApiResponse } from 'next';
import {
    getAdminSettings,
    patchAdminSettings,
} from '../../../backend/admin-settings';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import * as yup from 'yup';
import { AdminSettings } from '../../../types/admin';
import { validateCache } from '../../../backend/live-channels';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.isAdmin) {
        res.status(403).send({ error: 'Unauthorized' });
        return;
    }
    if (req.method === 'GET') {
        const settings = await getAdminSettings();
        res.status(200).json(settings);
    } else if (req.method === 'PATCH' && isValidPatchBody(req.body)) {
        const updated = await patchAdminSettings(req.body);
        validateCache();
        res.status(200).json(updated);
    } else {
        res.status(400).send({ error: 'Bad request' });
    }
}

const settingsSchema: yup.ObjectSchema<AdminSettings> = yup.object({
    blacklistedChannelIds: yup.array(yup.string()).optional(),
    blacklistedStreamCategoryIds: yup.array(yup.string()).optional(),
});

function isValidPatchBody(body: any): body is Partial<AdminSettings> {
    return settingsSchema.isValidSync(body);
}
