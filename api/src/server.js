import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';

import { PORT } from './config';

// import routes
import challenge from './challenge/challenge.routes.js';
import catalog from './catalog/catalog.routes.js';
import cas_auth from './auth/cas_auth.routes';

const app = express();

// Enable url-encoding
app.use(bodyParser.urlencoded({ extended: true }));
// Enable request logging.
app.use(morgan('tiny'));
// Setup sessions.
// TODO: use a real session store
app.use(session({ secret: 'cats TODO change this' }));

// Trust the proxy.
// See https://expressjs.com/en/guide/behind-proxies.html.
app.set('trust proxy', true);

// We use the IIFE pattern so that we can use await.
(async () => {
  // Setup routes.
  app.get('/api/ping', (req, res) => {
    res.json('pong');
  });
  await challenge(app);
  await catalog(app);
  await cas_auth(app);

  // Once routes have been created, start listening.
  app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
  });
})();
