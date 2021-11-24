import axios from 'axios';
import { TwitchStream, TwitchUser } from '../types/twitch';

type TokenData = {
    access_token: string;
    expires_in: number;
    expires_at: Date;
};

const chunkArray = <T>(array: T[], chunk_size: number): Array<T[]> =>
    Array(Math.ceil(array.length / chunk_size))
        .fill(undefined)
        .map((_, index) => index * chunk_size)
        .map((begin) => array.slice(begin, begin + chunk_size));

const GET_TOKEN_URL = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`;

const state: { appToken?: TokenData } = {
    appToken: null
};

async function getAppAccessToken() {
    if (
        state.appToken == null ||
        Date.now() >= state.appToken.expires_at.getTime()
    ) {
        try {
            const response = await axios.post<TokenData>(GET_TOKEN_URL);
            state.appToken = response.data;

            const expireDate = new Date();
            expireDate.setSeconds(
                expireDate.getSeconds() + state.appToken.expires_in
            );
            state.appToken.expires_at = expireDate;

            // Shave off a minute to give a slight buffer window
            state.appToken.expires_in -= 60 * 1000;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log('Failed to get app token', error);
        }
    }
    return state.appToken?.access_token;
}

const getHeaders = (token: string) => ({
    Authorization: `Bearer ${token}`,
    'Client-Id': process.env.TWITCH_CLIENT_ID
});

export async function getUsers(userIds: string[], getStreams = false) {
    const token = await getAppAccessToken();
    if (token == null) return {};

    const users: Record<string, TwitchUser> = {};

    for (const chunk of chunkArray(userIds, 100)) {
        const {
            data: { data: getUsersData }
        } = await axios.get<{ data: Array<TwitchUser> }>(
            `https://api.twitch.tv/helix/users?id=${chunk.join('&id=')}`,
            {
                headers: getHeaders(token)
            }
        );
        getUsersData.forEach((user) => (users[user.id] = user));

        if (getStreams) {
            const {
                data: { data: getStreamsData }
            } = await axios.get<{ data: Array<TwitchStream> }>(
                `https://api.twitch.tv/helix/streams?first=100&user_id=${chunk.join(
                    '&user_id='
                )}`,
                {
                    headers: getHeaders(token)
                }
            );
            getStreamsData.forEach(
                (stream) => (users[stream.user_id].stream = stream)
            );
        }
    }

    return users;
}
