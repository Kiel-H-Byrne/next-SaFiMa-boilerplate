import App, { Container } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import dynamic from 'next/dynamic';

import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import NProgress from 'nprogress';

import theme from './../src/Style/theme';
import AppBar from './../src/Components/Nav/AppBar';

import withReduxStore from './../src/Store/with-redux-store';
import { LinearProgress } from '@material-ui/core';

/// ====================================================================
/// ====================================================================
/// https://spectrum.chat/next-js/general/loading-indicator-when-changing-routes~bad01cae-15c3-47b7-84d3-c07965fb8661
Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`);
  NProgress.start()
});
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

/// ====================================================================
/// ====================================================================
/// ===================================================================
//PLACING HERE FOR BUG RELATED TO CSS-IN-JSS WITH NEXT-ROUTER...
/// https://github.com/zeit/next-plugins/issues/282

Router.events.on('routeChangeComplete', () => {
  if (process.env.NODE_ENV !== 'production') {
    const els = document.querySelectorAll(
      'link[href*="/_next/static/css/styles.chunk.css"]'
    );
    const timestamp = new Date().valueOf();
    if (els.length) {
      els[0].href = '/_next/static/css/styles.chunk.css?v=' + timestamp;
    }
  }
});
/// ====================================================================
/// ====================================================================
/// ====================================================================

// const DynamicComponentWithCustomLoading = dynamic(() => <LinearProgress />);
// console.log(process.env)
if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js');
  whyDidYouRender(React);
}

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <Provider store={reduxStore}>
            <CssBaseline />
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </Container>
    );
  }
}

// MyApp.whyDidYouRender = true

export default withReduxStore(MyApp);
