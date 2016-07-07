/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */

export const validId = 500;
export const validShortUrl = 'Valid Short Url';
export const validLongUrl = 'Valid Long Url';
export const invalidShortUrl = 'Invalid Short Url';
export const invalidLongUrl = 'http://Invalid Long Url';

const encode = (id) => {
  if (id === validId) {
    return validShortUrl
  }

  return invalidShortUrl;
};

const decode = () => validId;

export const bijectionStub = { encode, decode };


export const databaseStub = () => {
  this.insertUrl = () => Promise.resolve(validId);

  this.findUrl = () => Promise.resolve(validLongUrl);
};

export const clientStub = () => {
  this.checkUrl = (longUrl) => {
    if (longUrl === validLongUrl) {
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  };
};
