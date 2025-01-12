import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';
import * as yup from 'yup';
import { authOptions } from '../auth/[...nextauth]';
import axios from 'axios';

const WEBHOOK_URL = process.env.WEBHOOK_URL;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getServerSession(req, res, authOptions);
    if (session?.user == null) {
        res.status(403).send({ error: 'Unauthorized' });
        return;
    }

    if (req.method !== 'POST') {
        res.status(400).send({ error: 'Bad request' });
        return;
    }

    const testimonialSubmission = req.body;

    if (!isValidTestimonialBody(testimonialSubmission)) {
        res.status(400).send({ error: 'Bad request' });
        return;
    }

    const webhookData = {
        content: null,
        embeds: [
            {
                color: 5814783,
                fields: [
                    {
                        name: 'Testimonial',
                        value: testimonialSubmission.testimonial,
                    },
                    {
                        name: 'Streamer Type',
                        value: testimonialSubmission.streamerType,
                        inline: true,
                    },
                    {
                        name: 'Follows',
                        value: session.user.follows ?? 'Unknown',
                        inline: true,
                    },
                    ...(testimonialSubmission.discordUser?.length
                        ? [
                              {
                                  name: 'Discord',
                                  value: testimonialSubmission.discordUser,
                                  inline: true,
                              },
                          ]
                        : []),
                ],
                author: {
                    name: session.user.name,
                    url: `https://twitch.tv/${session.user.name}`,
                    icon_url: session.user.image,
                },
            },
        ],
    };

    try {
        await axios.post(WEBHOOK_URL, webhookData);

        res.status(200).send({ success: true });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Failed to send webhook :(', error);

        res.status(500).send({ error: 'Failed to send webhook' });
    }
}

type TestimonialSubmission = {
    testimonial: string;
    streamerType: string;
    discordUser?: string;
};

const testimonialSchema: yup.ObjectSchema<TestimonialSubmission> = yup.object({
    testimonial: yup.string().required(),
    streamerType: yup.string().required(),
    discordUser: yup.string().optional(),
});

function isValidTestimonialBody(body: unknown): body is TestimonialSubmission {
    return testimonialSchema.isValidSync(body);
}
