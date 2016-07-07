/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */
var Promise = require('bluebird');
var sinon = require('sinon');

var validGet = {
  params: {
    shortUrl: 'xb0'
  }
};

var validGetResponse = {
  redirect: sinon.spy(),
};

var notFoundGet = {};

var badGet = {
  params: {
    shortUrl: 400,
  }
};

var validPostReferer = {
  body: {
    url: 'referer',
  },
  headers: {
    referer: 'http://localhost:9090/',
  }
};

var validPostNoReferer = {
  body: {
    url: 'no referer',
  },
};

var send = sinon.spy();
var validPostResponse = {
  status: sinon.spy(function () {
    return {
      send,
    };
  }),
  send,
};

var invalidPost = {};

var badPost = {
  body: {
    url: 'i am not a valid url%',
  },
  app: {
    settings: {
      port: 9090,
    },
  },
  hostname: 'localhost',
  protocol: 'http',
};

var express = {
  Router: router
};

function router() {
  return {
    getCallback: null,
    postCallback: null,
    get: function (param, callback) {
      this.getCallback = callback;
    },
    post: function (param, callback) {
      this.postCallback = callback;
    },
  };
}

var url = {
  enlarge,
  shorten,
};

function enlarge(shortUrl) {
  if (shortUrl === validGet.params.shortUrl) {
    return Promise.resolve('http://example.com');
  } else {
    return Promise.reject(false);
  }
}

function shorten(longUrl) {
  if (longUrl === validPostReferer.body.url || longUrl === validPostNoReferer.body.url) {
    return Promise.resolve('a');
  } else {
    return Promise.reject(false);
  }
}

module.exports = {
  express: express,
  '../services/url': url,
  validGet: validGet,
  validGetResponse: validGetResponse,
  notFoundGet: notFoundGet,
  badGet: badGet,
  validPostReferer: validPostReferer,
  validPostNoReferer: validPostNoReferer,
  validPostResponse: validPostResponse,
  badPost: badPost,
  invalidPost: invalidPost,
  response: {
    status: sinon.spy(function () {
      return {
        end: function () {
        },
        send: function () {
        }
      };
    })
  }
};
