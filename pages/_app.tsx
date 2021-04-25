import Head from 'next/head';
import React from 'react';
import { Nav } from '../components';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Firebot - All-in-one Twitch bot</title>
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
            </Head>
            <>
                <Nav />
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <Component {...pageProps} />
            </>
        </>
    );
}
