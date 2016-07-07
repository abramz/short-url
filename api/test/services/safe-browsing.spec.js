/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */
/* global describe it before */
require('chai').should();
var proxyquire = require('proxyquire');
var stubs = require('../support/safe-browsing.stubs');

describe('SafeBrowsing', function () {
  describe('#checkUrl', function () {
    var client;

    before(function () {
      var Client = proxyquire('../../services/safe-browsing', stubs);

      client = new Client();
    });

    it('should resolve true when the url is safe', function (done) {
      client.checkUrl(stubs.safeUrl)
        .then(function (isSafe) {
          isSafe.should.equal(true);
          done();
        });
    });

    it('should resolve false when the url is not valid', function (done) {
      client.checkUrl(stubs.badUrl)
        .then(function (isSafe) {
          isSafe.should.equal(false);
          done();
        });
    });

    it('should resolve false when the url is not safe', function (done) {
      client.checkUrl(stubs.unsafeUrl)
        .then(function (isSafe) {
          isSafe.should.equal(false);
          done();
        });
    });

    it('should reject an error if there is an error checking url', function (done) {
      client.checkUrl(stubs.invalidUrl)
        .catch(function (error) {
          error.should.be.instanceof(Error);
          error.message.should.equal(stubs.invalidText);
          done();
        });
    });

    it('should reject an error if there is an error making the https request', function (done) {
      client.checkUrl(stubs.errorUrl)
        .catch(function (error) {
          error.should.be.instanceof(Error);
          error.message.should.equal(stubs.errorText);
          done();
        });
    });
  });
});
