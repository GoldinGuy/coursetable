/**
 * @file Routes for working with user accounts.
 */

import express from 'express';

import cookieParser from 'cookie-parser';

import {
  toggleBookmark,
  getUserWorksheet,
  addToWorksheet,
} from './user.handlers';

/**
 * Set up user routes.
 * @param app: express app instance.
 */
export default async (app: express.Express): Promise<void> => {
  app.use(cookieParser());
  app.post('/api/user/toggleBookmark', toggleBookmark);
  app.post('/api/user/addToWorksheet', addToWorksheet); // add to user created worksheet
  app.get('/api/user/worksheets', getUserWorksheet);
};
