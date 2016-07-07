'use strict';

/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */

var debug = require('debug')('url-service');
var Promise = require('bluebird');
var Database = require('./database');
var SafeBrowsing = require('./safe-browsing');
var bijection = require('./bijection');

var database = new Database();
var client = new SafeBrowsing();

/**
 * Shorten a long url, checks Google's SafeBrowsing API
 * before inserting in our DB
 * @param  {String} longUrl url to shorten
 * @return {Promise}        promise that resolves to the short Url or rejects an error
 */
var shorten = function (longUrl) {
  // check if the url is OK, use Google's Safe Browsing Lookup API
  return client.checkUrl(longUrl).then(function (isOk) {
    // if the url doesn't have a scheme, add http
    // required to redirect to an external site
    if (!longUrl.match(/^\w\w\w\w*:\/\//)) {
      longUrl = 'http://' + longUrl;
    }
    if (isOk) {
      // Url is OK, insert it
      debug('Url is safe, inserting, ' + longUrl);
      return database.insertUrl(longUrl);
    } else {
      // Url is not ok, reject error
      debug('Url is not safe, ' + longUrl);
      return Promise.reject(new Error('Not a safe URL'));
    }
  }).then(function (id) {
    // return id encoded as string (short url)
    debug('Url inserted, ' + longUrl + ' - ' + id);
    return bijection.encode(id);
  });
};

/**
 * Enlarge a short url
 * @param  {String} shortUrl url to enlarge
 * @return {Promise}         resolves to the long url or rejects an error
 */
var enlarge = function (shortUrl) {
  // get shrotUrl decoded as id
  var id = bijection.decode(shortUrl);
  debug(shortUrl + ', decoded to id, ' + id);
  // return the longUrl
  return database.findUrl(id);
};

module.exports = {
  shorten: shorten,
  enlarge: enlarge
};