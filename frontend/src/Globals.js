import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import WindowDimensionsProvider from './components/WindowDimensionsProvider';
import SeasonsProvider from './components/SeasonsProvider';

import { UserProvider } from './user';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { InMemoryCache, ApolloClient } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';

import posthog from 'posthog-js';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

//const POSTHOG_TOKEN = process.env.REACT_APP_POSTHOG_TOKEN;
const POSTHOG_TOKEN = 'KP78eJ-P-nRNQcVeL9pgBPGFt_KXOlCnT7ZwoJ9UDUo';
POSTHOG_TOKEN &&
  posthog.init(POSTHOG_TOKEN, {
    api_host: 'https://hog.coursetable.com',
    capture_pageview: false,
  });

const client = new ApolloClient({
  uri: '/ferry/v1/graphql',
  // default cache for now
  cache: new InMemoryCache(),
});

function SPAPageChangeListener({ callback }) {
  const location = useLocation();
  useEffect(() => {
    posthog.capture('$pageview');
  }, [location, hasFired]);
  return <></>;
}

function Globals({ children }) {
  return (
    <>
      {/* TODO: reenable StrictMode later */}
      {/* <React.StrictMode> */}
      <ApolloProvider client={client}>
        <UserProvider>
          <WindowDimensionsProvider>
            <SeasonsProvider>
              <Router>
                <SPAPageChangeListener />
                <div id="base">{children}</div>
              </Router>
              {/* TODO: style toasts with bootstrap using https://fkhadra.github.io/react-toastify/how-to-style/ */}
              <ToastContainer />
            </SeasonsProvider>
          </WindowDimensionsProvider>
        </UserProvider>
      </ApolloProvider>
      {/* </React.StrictMode> */}
    </>
  );
}

export default Globals;
