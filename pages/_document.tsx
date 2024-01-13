import Document, { Html, Main, NextScript, Head } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html className="bg-gradient-to-br from-gray-900 to-gray-1000 text-white 2xl:text-lg">
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://rsms.me/inter/inter.css"
                    />
                </Head>
                <body className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-thumb overflow-y-scroll">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
