import axios from 'axios';
import NextAuth from 'next-auth';
import TwitchProvider from 'next-auth/providers/twitch';

async function getFollowCount(userId, accessToken) {
    const getUserUrl = `https://api.twitch.tv/helix/users/follows?to_id=${userId}&first=1`;
    try {
        const response = await axios.get(getUserUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Client-Id': process.env.TWITCH_CLIENT_ID
            }
        });
        return response.data?.total;
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log('Failed to get follow count');
        return null;
    }
}

export default NextAuth({
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
                    follows: followCount
                };
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                (session.user as any).follows = token.follows;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.follows = user.follows;
            }
            return token;
        }
    },
    secret: process.env.AUTH_SECRET
});
