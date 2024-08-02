import type { NextApiRequest, NextApiResponse } from 'next';
import acceptLanguageParser from 'accept-language-parser';
import {
    addLiveChannel,
    ChannelSortBy,
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
            const sortBy = req.query.sortBy
                ? Array.isArray(req.query.sortBy)
                    ? req.query.sortBy
                    : [req.query.sortBy]
                : undefined;

            if (!validateSortBy(sortBy)) {
                res.status(400).send({ error: 'Invalid sortBy' });
                return;
            }

            const acceptLanguages = acceptLanguageParser.parse(
                req.headers['accept-language']
            );
            const dedupedSortLanguages = acceptLanguages
                .filter(
                    (lang, index, self) =>
                        index === self.findIndex((t) => t.code === lang.code)
                )
                .sort((a, b) => b.quality - a.quality)
                .map((lang) => lang.code);

            const search = req.query.search as string;
            const language = req.query.language
                ? Array.isArray(req.query.language)
                    ? req.query.language
                    : [req.query.language]
                : undefined;
            const category = req.query.category
                ? Array.isArray(req.query.category)
                    ? req.query.category
                    : [req.query.category]
                : undefined;
            const mature = req.query.mature
                ? req.query.mature === 'true'
                : undefined;

            const response = await getLiveChannels(
                page,
                sortBy,
                dedupedSortLanguages,
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
    sortBy: string[] | undefined
): sortBy is ChannelSortBy[] | undefined {
    const validSortBys: ChannelSortBy[] = [
        'viewers',
        'viewers:asc',
        'viewers:desc',
        'stream_uptime',
        'stream_uptime:asc',
        'stream_uptime:desc',
        'language',
        'language:asc',
        'language:desc',
    ];
    return (
        sortBy == null ||
        sortBy.every((s) => validSortBys.includes(s as ChannelSortBy))
    );
}