/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */

/*
 * Implements a bijective function, `encode`, and its inverse, `decode`.
 * A bijective function, F: X -> Y, has the following properties:
 * - each element of X must be paired with at least  one element of Y
 * - no element of X may be paired with more than one element of Y
 * - each element of Y must be paired with at least one element of X
 * - no element of Y may be paired with more than one element of X
 * See wikipedia for more: https://en.wikipedia.org/wiki/Bijection
 *
 * A function that maps values from 1 base to another base (ex: Base 10 to Base 2)
 * is bijective because there is exactly one X in Base 10 that pairs with exactly one
 * Y in Base 2.
 */

const bigInt = require('big-integer');

/**
 * set of characters we use in a short url
 * @type {String}
 */
const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';

/**
 * base of our set of characters
 * @type {Number}
 */
const base = alphabet.length;

/**
 * Determines whether the specified string is valid.
 * The string is valid if every character in the string
 * matches a character in Alphabet
 * @param  {String}  str The string to validate
 * @return {Boolean}     true if valid, false if invalid
 */
export function isValidString(str) {
  // Adding brackets lets us check that each character in str
  // is in the alphabet
  const pattern = `[${alphabet}]`;
  const regex = new RegExp(pattern, 'g');
  const matches = str.match(regex);

  return !!matches && matches.length === str.length;
}

/**
 * Encodes the specified value.
 * Map a base 10 value to a base {alphabet.length} value.
 * @param  {String}       value The value to encode.
 * @return {String|Number} Value mapped to a string in base {alphabet.length}, or -1 if it isn't a valid value.
 */
export function encode(value) {
  // convert the value to an integer, returns -1 if the conversion failed
  let encodedValues = parseInt(value, 10);
  if (isNaN(encodedValues)) {
    return -1;
  }
  encodedValues = bigInt(encodedValues);

  // value is 0, so we short-circuit by returning the first character in our alphabet
  if (encodedValues.equals(0)) {
    return alphabet[0];
  }

  // start with an empty string, build up from there
  let str = '';

  // this is the bijective function explained above,
  // we are mapping value (base 10) to base {alphabet.length}.
  while (encodedValues.greater(0)) {
    str = alphabet[encodedValues.mod(base)] + str;
    encodedValues = encodedValues.divide(base);
  }
  return str;
}

/**
 * Decodes the specified string.
 * Map a base {alphabet.length} value to a base 10 value.
 * @param  {String} str The string to decode.
 * @return {Number}     String mapped to a value in base 10, or -1 if it isn't a valid string.
 */
export function decode(str) {
  if (!isValidString(str)) {
    return -1;
  }
  let value = bigInt();

  str.split('').forEach((element) => {
    value = value.multiply(base).plus(alphabet.indexOf(element));
  });

  return value.toString();
}
