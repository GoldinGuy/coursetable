import express from 'express';
import bodyParser from 'body-parser';

import morgan from './logging/morgan';
import winston from './logging/winston';

import session from 'cookie-session';
import fs from 'fs';
import https from 'https';
import cors from 'cors';

import {
  PORT,
  INSECURE_PORT,
  SESSION_SECRET,
  CORS_OPTIONS,
  PHP_URI,
  STATIC_FILE_DIR,
} from './config';

const { createProxyMiddleware } = require('http-proxy-middleware');

// import routes
import catalog from './catalog/catalog.routes';
import cas_auth, { authSoft, authHard } from './auth/cas_auth.routes';

import passport from 'passport';
import { passportConfig } from './auth/cas_auth.routes';

import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

Sentry.init({
  dsn: "https://9360fd2ff7f24865b74e92602d0a1a30@o476134.ingest.sentry.io/5665141",

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

const app = express();

app.use(cors(CORS_OPTIONS));

// Enable request logging.
app.use(morgan);

// Strip all headers matching X-COURSETABLE-* from incoming requests.
app.use((req, _, next) => {
  for (const header of Object.keys(req.headers)) {
    // Headers are automatically made lowercase by express.
    if (header.startsWith('x-coursetable-')) {
      delete req.headers[header];
    }
  }

  next();
});

// Redirection routes for historical pages.
app.get('/Blog', (_, res) => {
  res.redirect('https://legacy.coursetable.com/Blog.html');
});
app.get('/recommendations.htm', (_, res) => {
  res.redirect('https://legacy.coursetable.com/recommendations.htm');
});

// Enable url-encoding
app.use(bodyParser.urlencoded({ extended: true }));

// Setup sessions.
app.use(
  session({
    secret: SESSION_SECRET,

    // Cookie lifetime of one year.
    maxAge: 365 * 24 * 60 * 60 * 1000,

    // We currently set this to false because our logout process involves
    // the client-side JS clearing all cookies.
    httpOnly: false,

    // Not enabling this yet since it could have unintended consequences.
    // Eventually we should enable this.
    // secure: true,
  })
);

// Trust the proxy.
// See https://expressjs.com/en/guide/behind-proxies.html.
app.set('trust proxy', true);

// Serve with SSL.
https
  .createServer(
    {
      key: fs.readFileSync('server.key'),
      cert: fs.readFileSync('server.cert'),
    },
    app
  )
  .listen(PORT, () => {
    console.log(`Secure dev proxy listening on port ${PORT}`);
  });

// We use the IIFE pattern so that we can use await.
(async () => {
  /* Configuring passport */
  passportConfig(passport);
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/api/auth/test', (req, res) => {
    if (req.user) {
      res.json({ auth: true, id: req.user.netId, user: req.user });
    } else {
      res.json({ auth: false, id: null });
    }
  });

  app.use('/api/static', authHard);

  // Mount static files route and require NetID authentication
  app.use(
    '/api/static',
    express.static(STATIC_FILE_DIR, {
      cacheControl: true,
      maxAge: '1h',
      lastModified: true,
      etag: true,
    })
  );

  // Setup routes.
  app.get('/api/ping', (req, res) => {
    res.json('pong');
  });
  await catalog(app);
  await cas_auth(app);

  app.use('/legacy_api', authSoft);
  app.use(
    ['/legacy_api', '/index.php'],
    createProxyMiddleware({
      target: PHP_URI,
      pathRewrite: {
        '^/legacy_api': '/', // remove base path
      },
      xfwd: true,
    })
  );

  // restrict GraphQL access for authenticated Yale students only
  app.use('/ferry', authHard);
  app.use(
    '/ferry',
    createProxyMiddleware({
      target: 'http://graphql-engine:8080',
      pathRewrite: {
        '^/ferry': '/', // remove base path
      },
      ws: true,
    })
  );

  // Once routes have been created, start listening.
  app.listen(INSECURE_PORT, () => {
    winston.info(`Insecure API listening on port ${INSECURE_PORT}`);
  });
})();
