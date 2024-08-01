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
        const page = parseInt((req.query.page as string) ?? '1');
        if (isNaN(page)) {
            res.status(400).send({ error: 'Invalid page' });
        } else {
            const sortBy = req.query.sortBy as string;
            const sortDirection = req.query.sortDirection as string;

            if (!validateSortBy(sortBy)) {
                res.status(400).send({ error: 'Invalid sortBy' });
                return;
            }

            if (!validateSortDirection(sortDirection)) {
                res.status(400).send({ error: 'Invalid sortDirection' });
                return;
            }

            const search = req.query.search as string;
            const language = req.query.language as string;
            const category = req.query.category as string;
            const mature = req.query.mature
                ? req.query.mature === 'true'
                : undefined;

            const response = await getLiveChannels(
                page,
                sortBy,
                sortDirection,
                language || category || search || mature
                    ? { search, language, category, mature }
                    : undefined
            );
            res.status(200).send(response);
        }
    } else {
        res.status(400).send({ error: 'Bad request' });
    }
}

function validateSortBy(
    sortBy: string
): sortBy is 'stream_uptime' | 'viewers' | undefined {
    return sortBy == null || sortBy === 'stream_uptime' || sortBy === 'viewers';
}

function validateSortDirection(
    sortDirection: string
): sortDirection is 'asc' | 'desc' | undefined {
    return (
        sortDirection == null ||
        sortDirection === 'asc' ||
        sortDirection === 'desc'
    );
}