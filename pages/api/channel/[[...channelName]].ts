import type { NextApiRequest, NextApiResponse } from 'next';
import { getChannelInfoByUsername } from '../../../backend/twitch-api';
import NodeCache from 'node-cache';

const channelCache = new NodeCache({ stdTTL: 10, deleteOnExpire: true });

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const channelName = req.query.channelName?.[0];

    if (req.method !== 'GET' || !channelName?.length) {
        res.status(400).send({ error: 'Bad request' });
        return;
    }

    const cachedChannelInfo = channelCache.get(channelName);
    if (cachedChannelInfo) {
        res.status(200).json(cachedChannelInfo);
        return;
    }

    const channelInfo = await getChannelInfoByUsername(channelName);

    if (!channelInfo) {
        res.status(404).send({ error: 'Channel not found' });
        return;
    }

    channelCache.set(channelName, channelInfo);

    res.status(200).json(channelInfo);
}
