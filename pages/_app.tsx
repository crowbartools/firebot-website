import Head from 'next/head';
import React from 'react';
import { Nav } from '../components';
import { ToastProvider } from '../components/toasts';
import { initialStore, Provider as StoreProvider } from '../stores';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
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

                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Head>
            <>
                <StoreProvider value={initialStore}>
                    <ToastProvider>
                        <Nav />
                        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                        <Component {...pageProps} />
                    </ToastProvider>
                </StoreProvider>
            </>
        </>
    );
}
