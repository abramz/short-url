/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */

import Debug from 'debug';
import Database from './database';
import SafeBrowsingClient from './safe-browsing';
import { encode, decode } from './bijection';

const debug = Debug('url-service'); // eslint-disable-line new-cap
const database = new Database();
const safeBrowsingClient = new SafeBrowsingClient();

/**
 * Shorten a long url, checks Google's SafeBrowsing API
 * before inserting in our DB
 * @param  {String} longUrl url to shorten
 * @return {Promise}        promise that resolves to the short Url or rejects an error
 */
export async function shorten(longUrl) {
  let url;
  const isSafe = await safeBrowsingClient.checkUrl(longUrl);
  if (!isSafe) {
    const msg = `Url is not safe, ${longUrl}`;
    debug(msg);
    throw new Error(msg);
  }

  // if the url doesn't have a scheme, add http
  // required to redirect to an external site
  if (!longUrl.match(/^\w\w\w\w*:\/\//)) {
    url = `http://${longUrl}`;
  }

  // Url is OK, insert it
  debug(`Url is safe, inserting, ${url}`);
  const id = database.insertUrl(url);

  debug(`Url inserted, ${url} - ${id}`);
  return encode(id);
}

/**
 * Enlarge a short url
 * @param  {String} shortUrl url to enlarge
 * @return {Promise}         resolves to the long url or rejects an error
 */
export async function enlarge(shortUrl) {
  // get shortUrl decoded as id
  const id = decode(shortUrl);

  // return the longUrl
  return await database.findUrl(id);
}
