/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */

import https from 'https';
import Promise from 'bluebird';
import validator from 'validator';

/**
 * Safe Browsing Client
 */
class SafeBrowsingClient {
  constructor() {
    const apiKey = process.env.SB_KEY || '';
    this.sbUrl = `https://sb-ssl.google.com/safebrowsing/api/lookup?client=short-url&key=${apiKey}&appver=1.5.2&pver=3.1&url=`;
  }

  checkUrl(url) {
    if (!validator.isURL(url)) {
      // not a valid url
      return Promise.resolve(false);
    }

    const requestUrl = this.sbUrl + url;
    return new Promise((resolve, reject) => {
      https.get(requestUrl, (response) => {
        let result = '';

        response.on('data', (chunk) => {
          result += chunk;
        });

        response.on('end', () => {
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
      }).on('error', (error) => {
        reject(new Error(error));
      });
    });
  }
}

export default SafeBrowsingClient;
