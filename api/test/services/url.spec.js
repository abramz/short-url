/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */
/* global describe it before */
require('chai').should();
var proxyquire = require('proxyquire');
var stubs = require('../support/url.stubs');

describe('Url', function () {
  var url;

  before(function () {
    url = proxyquire('../../services/url', stubs);
  });

  describe('#shorten()', function () {
    it('should return an id if the url is valid', function (done) {
      url.shorten(stubs.validLongUrl)
        .then(function (shortUrl) {
          shortUrl.should.equal(stubs.validShortUrl);
          done();
        });
    });

    it('should reject an error if the url is not safe', function (done) {
      url.shorten(stubs.invalidLongUrl)
        .catch(function (error) {
          error.should.be.instanceof(Error);
          done();
        });
    });
    // do not need to check other cases as they are covered in other specs
  });

  describe('#enlarge()', function () {
    it('should return a long url if the shortUrl can be found', function (done) {
      url.enlarge(stubs.validShortUrl)
        .then(function (longUrl) {
          longUrl.should.equal(stubs.validLongUrl);
          done();
        });
    });
    // do not need to check other cases as they are covered in other specs
  });
});
