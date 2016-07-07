/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */

export const safeUrl = 'http://example.com';
export const badUrl = 'not a url';
export const unsafeUrl = 'http://unsafe.com';
export const invalidUrl = 'http://invalid.com';
export const invalidText = 'invalid url';
export const errorUrl = 'http://error.com';
export const errorText = 'https failed';

export const https = {};

function on(event, callback) {
  if (event === 'data') {
    callback(invalidText);
  } else if (event === 'end') {
    callback();
  }
}

https.get = (url, callback) => { // eslint-disable-line consistent-return
  const response = {};
  if (url.match(`=${safeUrl}$`)) {
    response.statusCode = 204;
    response.on = on;
    callback(response);
  } else if (url.match(`=${unsafeUrl}$`)) {
    response.statusCode = 200;
    response.on = on;
    callback(response);
  } else if (url.match(`=${unsafeUrl}$`)) {
    response.statusCode = 500;
    response.on = on;
    callback(response);
  } else if (url.match(`=${errorUrl}$`)) {
    return {
      on: (event, cb) => cb(errorText),
    };
  }
};
