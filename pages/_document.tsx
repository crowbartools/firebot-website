import Document, { Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html className="bg-gray-900 text-white xl:text-lg">
                <body className="scrollbar-thin scrollbar-thumb-gray-700 scrollbar-thumb">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
