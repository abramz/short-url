/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */
/* global describe it before */
require('chai').should();
var proxyquire = require('proxyquire');
var stubs = require('../support/database.stubs');

describe('database', function () {
  var database;
  before(function () {
    var Database = proxyquire('../../services/database', {
      mysql: stubs.mysql,
      sql: stubs.sql
    });

    database = new Database();
  });

  describe('#insertUrl()', function () {
    it('should successfully insert a url', function (done) {
      database.insertUrl(stubs.successfulUrl)
        .then(function (id) {
          id.should.equal(stubs.successId);
          done();
        });
    });

    it('should return an error on failure', function (done) {
      database.insertUrl(stubs.unsuccessfulText)
        .catch(function (error) {
          error.cause.should.be.instanceof(Error);
          error.cause.message.should.equal(stubs.unsuccessfulResultText);
          done();
        });
    });
  });

  describe('#findUrl()', function () {
    it('should find a valid id', function (done) {
      database.findUrl(stubs.successId)
        .then(function (longUrl) {
          longUrl.should.equal(stubs.successfulUrl);
          done();
        });
    });

    it('should return an error on failure', function (done) {
      database.findUrl(stubs.unsuccessfulText)
        .catch(function (error) {
          error.cause.should.be.instanceof(Error);
          error.cause.message.should.equal(stubs.unsuccessfulResultText);
          done();
        });
    });
  });
});
