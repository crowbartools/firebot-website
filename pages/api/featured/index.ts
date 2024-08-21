import { NextApiRequest, NextApiResponse } from 'next';
import { getRandomLiveChannel } from '../../../backend/live-channels';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET') {
        res.status(400).send({ error: 'Bad request' });
        return;
    }
    const channel = await getRandomLiveChannel();
    res.status(200).json(channel);
}
