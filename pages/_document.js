import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import theme from './../src/Style/theme';


const appSettings = {
  name: 'The Highlyfe',
  url: '',
  imageUrl: '',
  twitter_handle: '',
  description: '',

}

class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          />
          {/** 
            manifest.json provides metadata used when your web app is installed on a
            user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/
          **/}
          <link rel="apple-touch-icon" sizes="57x57" href="static/img/apple-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="static/img/apple-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="static/img/apple-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="static/img/apple-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="static/img/apple-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="static/img/apple-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="static/img/apple-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="static/img/apple-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="static/img/apple-icon-180x180.png" />
          <link rel="icon" type="image/png" sizes="192x192"  href="static/img/android-icon-192x192.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="static/img/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="96x96" href="static/img/favicon-96x96.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="static/img/favicon-16x16.png" />
          <link rel='mask-icon' href='/static/img/safari-pinned-tab.svg' color='#5bbad5' />
          <link rel='shortcut icon' href='/static/img/favicon.ico' />
          <link rel="manifest" href="static/manifest.json" />
          
          <meta name='application-name' content={appSettings.name} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content={appSettings.name} />
          <meta name='description' content={appSettings.description} />
          <meta name='format-detection' content='telephone=no' />

          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-config' content='/static/icons/browserconfig.xml' />
          <meta name="msapplication-TileColor" content={theme.palette.primary.main} />
          <meta name="msapplication-TileImage" content="static/img/ms-icon-144x144.png" />
          <meta name='msapplication-tap-highlight' content='no' />
          <meta name="theme-color" content={theme.palette.primary.main} />

          <meta name='twitter:card' content="summary" />
          <meta name='twitter:url' content={appSettings.url} />
          <meta name='twitter:title' content={appSettings.name} />
          <meta name='twitter:description' content={appSettings.description} />
          <meta name='twitter:image' content={appSettings.imageUrl} />
          <meta name='twitter:creator' content={appSettings.twitter_handle} />
          <meta property='og:type' content='website' />
          <meta property='og:title' content={appSettings.name} />
          <meta property='og:description' content={appSettings.description} />
          <meta property='og:site_name' content={appSettings.name} />
          <meta property='og:url' content={appSettings.url} />
          <meta property='og:image' content={appSettings.imageUrl} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="stylesheet" href="/static/markdown.css" />
        </Head>
        <body>
          <noscript>You need to enable JavaScript to run this app.</noscript>
          <Main />
          <NextScript />
          <script crossOrigin="true" type="text/javascript" src="https://unpkg.com/default-passive-events"></script>
        </body>
      </html>
    );
  }
}

MyDocument.getInitialProps = async ctx => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: App => props => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
        {sheets.getStyleElement()}
      </React.Fragment>,
    ],
  };
};

export default MyDocument;