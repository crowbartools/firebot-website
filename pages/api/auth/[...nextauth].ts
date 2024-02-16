import axios from 'axios';
import NextAuth, { AuthOptions } from 'next-auth';
import TwitchProvider from 'next-auth/providers/twitch';

const ADMIN_TWITCH_IDS: string[] = [
    '22639237', // firebottletv
    '58612601', // ebiggz
    '26831599', // sreject
    '50989853', // zunderscore
    '90428736', // theperry
    '37677315', // heyaapl
];

async function getFollowCount(userId: string, accessToken: string) {
    const getUserUrl = `https://api.twitch.tv/helix/channels/followers?broadcaster_id=${userId}&first=1`;
    try {
        const response = await axios.get<{ total: number }>(getUserUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Client-Id': process.env.TWITCH_CLIENT_ID,
            },
        });
        return response.data?.total;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Failed to get follow count');
        return null;
    }
}

export const authOptions: AuthOptions = {
    providers: [
        TwitchProvider({
            clientId: process.env.TWITCH_CLIENT_ID,
            clientSecret: process.env.TWITCH_CLIENT_SECRET,
            async profile(profile, tokens) {
                const followCount = await getFollowCount(
                    profile.sub,
                    tokens.access_token
                );

                return {
                    id: profile.sub,
                    name: profile.preferred_username,
                    email: profile.email,
                    image: profile.picture,
                    isAdmin: ADMIN_TWITCH_IDS.includes(profile.sub),
                    follows: followCount,
                };
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                (session.user as any).follows = token.follows;
                (session.user as any).isAdmin = token.isAdmin;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.follows = (user as any).follows;
                token.isAdmin = (user as any).isAdmin;
            }
            return token;
        },
    },
    secret: process.env.AUTH_SECRET,
};

export default NextAuth(authOptions);
