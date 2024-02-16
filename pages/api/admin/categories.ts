import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import { searchCategories } from '../../../backend/twitch-api';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);
    if (!session?.user?.isAdmin) {
        res.status(403).send({ error: 'Unauthorized' });
        return;
    }
    if (req.method !== 'GET') {
        res.status(400).send({ error: 'Bad request' });
        return;
    }
    const categories = await searchCategories(req.query.query as string);
    res.status(200).json(categories);
}
