'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */

var debug = require('debug')('index-router');
var express = require('express');
var url = require('../services/url');
var router = express.Router();

/* GET Short Url */
router.get('/:shortUrl', function (req, res) {
  // needs a route parameter to retrieve
  if (!req.params || !req.params.shortUrl) {
    debug('Invalid request, ' + (0, _stringify2.default)(req.params));
    res.status(404).end();
    return _promise2.default.resolve(false);
  }
  // if we can find the url, redirect
  // otherwise send a 500 error
  return url.enlarge(req.params.shortUrl).then(function (longUrl) {
    debug('Valid request, ' + req.params.shortUrl + ', redirecting to, ' + longUrl);
    res.redirect(301, longUrl);
  }).catch(function (error) {
    debug('Internal error, ' + req.params.shortUrl + ', error: ' + error);
    res.status(500).end();
  });
});

/* POST Long Url. */
router.post('/', function (req, res) {
  // post requires a url in the body
  if (!req.body || !req.body.url) {
    debug('Invalid request, ' + (0, _stringify2.default)(req.body));
    res.status(400).send({ message: 'Url required in POST data' });
    return _promise2.default.resolve(false);
  }
  // create the url to append the shortUrl to
  var host;
  if (req.headers && req.headers.referer) {
    host = req.headers.referer;
  } else {
    host = 'http://localhost/';
  }
  // retrieve the shortUrl and send it back
  // otherwise send a 500 error
  return url.shorten(req.body.url).then(function (shortUrl) {
    var fullUrl = [host, 's/', shortUrl].join('');
    debug('Valid request, ' + req.body.url + ', sending, ' + fullUrl);
    res.status(200).send({
      url: fullUrl
    });
  }).catch(function (error) {
    debug('Internal error, ' + req.body.url + ', error: ' + error);
    res.status(500).end();
  });
});

module.exports = router;