'use strict';

/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */

var Promise = require('bluebird');
var mysql = require('mysql');
var sql = require('sql');
sql.setDialect('mysql');

/**
 * MySQL client
 */
function Database() {
  // create a connection pool
  this.pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.SQL_HOST || '127.0.0.1',
    port: process.env.SQL_PORT || 3306,
    user: process.env.SQL_USER || 'shorturl-user',
    password: process.env.SQL_PASSWORD || '',
    database: process.env.SQL_DB || 'shorturl'
  });
  Promise.promisifyAll(this.pool);

  // schema for the urls table
  this.urlSchema = sql.define({
    name: process.env.SQL_TABLE || 'urls',
    columns: ['id', 'long-url', 'created-date']
  });
}

Database.prototype.query = function (query) {
  var _connection;
  return this.pool.getConnectionAsync().then(function (connection) {
    _connection = connection;
    var queryAsync = Promise.promisify(connection.query);
    return queryAsync.call(connection, query.text, query.values);
  }).finally(function () {
    if (_connection) {
      _connection.release();
    }
  });
};
/**
 * insert a url and return the id
 * @param  {String} url url to insert
 * @return {Promise}    promise that resolves to the inserted id
 */
Database.prototype.insertUrl = function (url) {
  // create the query to insert the url
  var date = new Date();
  var query = this.urlSchema.insert({
    'long-url': url,
    'created-date': date
  }).toQuery();

  // execute the insert query and return the id
  return this.query(query).then(function (result) {
    return result[0].insertId;
  });
};

/**
 * retrieve a url by the id
 * @param  {Number} id id of the url to retrieve
 * @return {Promise}   promise that resolves to the url
 */
Database.prototype.findUrl = function (id) {
  var query = this.urlSchema.select(this.urlSchema['long-url']).from(this.urlSchema).where(this.urlSchema.id.equals(id)).toQuery();

  // execute the select query and returl the url
  return this.query(query).then(function (result) {
    return result[0][0]['long-url'];
  });
};

module.exports = Database;