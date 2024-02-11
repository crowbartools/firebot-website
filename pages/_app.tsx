import Head from 'next/head';
import React from 'react';
import { Nav } from '../components';
import { ToastProvider } from '../components/toasts';
import { initialStore, Provider as StoreProvider } from '../stores';
import { SessionProvider } from 'next-auth/react';
import '../styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
        <>
            <Head>
                <title>Firebot - All-in-one Twitch bot</title>
                <meta property="og:url" content="https://firebot.app" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Firebot" />
                <meta
                    property="og:description"
                    content="Powerful all-in-one bot for Twitch streamers"
                />
                <meta
                    property="og:image"
                    content="https://firebot.app/link-preview-img.png"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@firebotapp" />
                <meta name="twitter:title" content="Firebot" />
                <meta
                    name="twitter:description"
                    content="Powerful all-in-one bot for Twitch streamers"
                />
                <meta
                    name="twitter:image"
                    content="https://firebot.app/link-preview-img.png"
                />
            </Head>
            <>
                <SessionProvider session={session}>
                    <QueryClientProvider client={queryClient}>
                        <StoreProvider value={initialStore}>
                            <ToastProvider>
                                <Nav />
                                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                                <Component {...pageProps} />
                            </ToastProvider>
                        </StoreProvider>
                    </QueryClientProvider>
                </SessionProvider>
            </>
        </>
    );
}
