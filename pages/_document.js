import Document, {Html, Head, Main, NextScript} from 'next/document';

class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }

  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" sizes="192x192" href="/icon.jpg" />
          <link
            rel="shortcut icon"
            href="/icon-shortcut.jpg"
            type="image/jpeg"
          />
          <link
            rel="apple-touch-icon"
            href="/icon-apple-touch.jpg"
            type="image/jpeg"
          />
        </Head>
        <body>
          <script
            async
            defer
            data-domain="field-ready-projects.openknowhow.org"
            src="https://plausible.io/js/plausible.outbound-links.js"></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default CustomDocument;
