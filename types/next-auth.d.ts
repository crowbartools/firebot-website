// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            follows: number;
            isAdmin: boolean;
        } & DefaultSession['user'];
    }
}
