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
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
                <meta property="og:url" content="https://firebot.app" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Firebot" />
                <meta name="twitter:card" content="summary" />
                <meta
                    property="og:description"
                    content="All-in-one bot for Twitch streamers"
                />
                <meta property="og:image" content="/link-preview-img.png" />
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
