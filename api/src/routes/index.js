/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */

import Debug from 'debug';
import express from 'express';
import { enlarge, shorten } from '../services/url';

const debug = Debug('router'); // eslint-disable-line new-cap
const router = express.Router(); // eslint-disable-line new-cap

/* GET Short Url */
router.get('/:shortUrl', async (req, res, next) => {
  // if we can find the url, use a temporary redirect (so we could track clicks)
  // otherwise send a 500 error
  try {
    // needs a route parameter to retrieve
    if (!req.params || !req.params.shortUrl) {
      const msg = `Invalid request, ${JSON.stringify(req.params)}`;
      const error = new Error(msg);
      res.status(404);
      debug(msg);
      next(error);
    } else {
      const longUrl = await enlarge(req.params.shortUrl);
      debug(`Valid request, ${req.params.shortUrl}, redirecting to, ${longUrl}`);
      res.redirect(302, longUrl);
    }
  } catch (error) {
    debug(`Internal error, ${req.body.url}, error: ' + ${error}`);
    next(error);
  }
});

/* POST Long Url. */
router.post('/', async (req, res, next) => {
  try {
    // post requires a url in the body
    if (!req.body || !req.body.url) {
      const msg = `Invalid request, ${JSON.stringify(req.body)}`;
      const error = new Error(msg);
      res.status(400).send({ message: 'Url required in POST data' });
      debug(msg);
      next(error);
    } else {
      let host;
      if (req.headers && req.headers.referer) {
        host = req.headers.referer;
      } else {
        host = 'http://localhost/';
      }

      const shortUrl = await shorten(req.body.url);
      const fullUrl = [host, 's/', shortUrl].join('');
      debug(`Valid request, ${req.body.url}, sending, ${fullUrl}`);
      res.status(200).send({
        url: fullUrl,
      });
    }
  } catch (error) {
    debug(`Internal error, ${req.body.url}, error: ' + ${error}`);
    next(error);
  }
});

export default router;
