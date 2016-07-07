/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */
/* global describe it before */
var chai = require('chai');
var sinonChai = require('sinon-chai');
var proxyquire = require('proxyquire');
var stubs = require('../support/index.stubs');
chai.should();
chai.use(sinonChai);

describe('Index Methods', function () {
  var index;
  before(function () {
    index = proxyquire('../../routes/index', stubs);
  });

  describe('#GET', function () {
    it('should respond with status code 301 for valid get request', function (done) {
      index.getCallback(stubs.validGet, stubs.validGetResponse).finally(function () {
        stubs.validGetResponse.redirect.should.have.been.calledWith(301);
        done();
      });
    });

    it('should respond with status code 404 for invalid get request', function (done) {
      index.getCallback(stubs.notFoundGet, stubs.response).then(function () {
        stubs.response.status.should.have.been.calledWith(404);
        done();
      });
    });

    it('should respond with status code 500 for bad get request', function (done) {
      index.getCallback(stubs.badGet, stubs.response).finally(function () {
        stubs.response.status.should.have.been.calledWith(500);
        done();
      });
    });
  });

  describe('#POST', function () {
    it('should response with status code 200 for a valid post request - referer', function (done) {
      index.postCallback(stubs.validPostReferer, stubs.validPostResponse).finally(function () {
        stubs.validPostResponse.status.should.have.been.calledWith(200);
        stubs.validPostResponse.send.should.have.been.calledWith({url: 'http://localhost:9090/s/a'});
        done();
      });
    });

    it('should response with status code 200 for a valid post request - no referer', function (done) {
      index.postCallback(stubs.validPostNoReferer, stubs.validPostResponse).finally(function () {
        stubs.validPostResponse.status.should.have.been.calledWith(200);
        stubs.validPostResponse.send.should.have.been.calledWith({url: 'http://localhost/s/a'});
        done();
      });
    });

    it('should response with status code 400 for a invalid post request', function (done) {
      index.postCallback(stubs.invalidPost, stubs.response).then(function () {
        stubs.response.status.should.have.been.calledWith(400);
        done();
      });
    });

    it('should response with status code 500 for a bad post request', function (done) {
      index.postCallback(stubs.badPost, stubs.response).finally(function () {
        stubs.response.status.should.have.been.calledWith(500);
        done();
      });
    });
  });
});
