'use strict';

/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */

var https = require('https');
var Promise = require('bluebird');
var validator = require('validator');

/**
 * Safe Browsing Client
 */
var Client = function () {
  var apiKey = process.env.SB_KEY || '';
  this.sbUrl = 'https://sb-ssl.google.com/safebrowsing/api/lookup?client=short-url&key=' + apiKey + '&appver=1.5.2&pver=3.1&url=';
};

/**
 * Checks a Url with Google's safe browsing API
 * @param  {String} url the url to check
 * @return {Promise}    resolves to true if the url is OK, false if it isn't or rejects an error
 */
Client.prototype.checkUrl = function (url) {
  if (!validator.isURL(url)) {
    // not a valid url
    return Promise.resolve(false);
  }
  var requestUrl = this.sbUrl + url;
  return new Promise(function (resolve, reject) {
    https.get(requestUrl, function (response) {
      var result = '';

      response.on('data', function (chunk) {
        result += chunk;
      });

      response.on('end', function () {
        if (response.statusCode === 204) {
          // safe
          resolve(true);
        } else if (response.statusCode === 200) {
          // not safe
          resolve(false);
        } else {
          // error
          reject(new Error(result));
        }
      });
    }).on('error', function (error) {
      reject(new Error(error));
    });
  });
};

module.exports = Client;