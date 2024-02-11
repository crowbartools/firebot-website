import type { NextApiRequest, NextApiResponse } from 'next';
import {
    addLiveChannel,
    getLiveChannels,
} from '../../../backend/live-channels';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST' && req.query.channelId?.[0] != null) {
        const result = await addLiveChannel(req.query.channelId[0]);
        res.status(result.success ? 200 : 400).send(result);
    } else if (req.method === 'GET' && req.query.channelId?.[0] == null) {
        const page = parseInt((req.query.page?.[0] as string) ?? '1');
        if (isNaN(page)) {
            res.status(400).send({ error: 'Invalid page' });
        } else {
            const response = getLiveChannels(page);
            res.status(200).send(response);
        }
    } else {
        res.status(400).send({ error: 'Bad request' });
    }
}
