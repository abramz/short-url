/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */
/* global describe it */
require('chai').should();
var bigInt = require('big-integer');
var bijection = require('.././bijection');

describe('bijection', function () {
  describe('#isValidString()', function () {
    it('should validate a string that contains only characters in the alphabet', function () {
      var validStrings = ['abcde1g4g321', 'abc123', '987gbd', '0', '124lasdfkjlsadf'];

      validStrings.forEach(function (element) {
        bijection.isValidString(element).should.be.true;
      });
    });

    it('should not validate a string that contains invalid characters', function () {
      var invalidStrings = ['asdf;5', '*', '$', 'lkjmn\'', '\'', 'J'];

      invalidStrings.forEach(function (element) {
        bijection.isValidString(element).should.be.false;
      });
    });
  });

  describe('#encode()', function () {
    it('should encode numbers to string made from the alphabet', function () {
      var actual;
      var tests = [0, 5, 102, 551, 620, 945, 1245, 9001, 99999, bigInt(Number.MAX_SAFE_INTEGER)];
      var expected = ['a', 'f', 'c4', 'pl', 'ri', '0j', '8v', 'g8b', 'cff1', 'cqy2khzkcq5'];

      tests.forEach(function (element, index) {
        actual = bijection.encode(element);
        actual.should.equal(expected[index]);
      });
    });

    it('should return -1 for values that can\'t be decoded', function () {
      bijection.encode('Not An Int').should.equal(-1);
    });
  });

  describe('#decode()', function () {
    it('should decode strings made from the alphabet to numbers', function () {
      var actual;
      var tests = ['cqy2khzkcq5', '0', 'gjdgxr', 'zzzzz', 'as34'];
      var expected = [bigInt(Number.MAX_SAFE_INTEGER).toString(), 26, 378062189, 43190125, 24402];

      tests.forEach(function (element, index) {
        actual = bijection.decode(element);
        actual.should.equal(expected[index].toString());
      });
    });

    it('should return -1 for values that can\'t be decoded', function () {
      bijection.decode('asdf;5').should.equal(-1);
    });
  });
});
