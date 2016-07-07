/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */

import Promise from 'bluebird';
import mysql from 'mysql';
import sql from 'sql';
sql.setDialect('mysql');

/**
 * MySQL client
 */
class Database {
  constructor() {
    // create a connection pool
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.SQL_HOST,
      port: process.env.SQL_PORT,
      user: process.env.SQL_USER,
      password: process.env.SQL_PASSWORD,
      database: process.env.SQL_DB,
    });
    Promise.promisifyAll(this.pool);

    // schema for the urls table
    this.urlSchema = sql.define({
      name: process.env.SQL_TABLE || 'urls',
      columns: ['id', 'long-url', 'created-date'],
    });
  }

  async query(q) {
    let connection;
    try {
      connection = await this.pool.getConnectionAsync();
      const queryAsync = Promise.promisify(connection.query);
      const result = await queryAsync(connection, q.text, q.values);
      if (connection) {
        connection.release();
      }

      return result;
    } catch (error) {
      if (connection) {
        connection.release();
      }

      throw error;
    }
  }

  /**
   * insert a url and return the id
   * @param  {String} url url to insert
   * @return {Promise}    promise that resolves to the inserted id
   */
  async insertUrl(url) {
    // create the query to insert the url
    const date = new Date();
    const query = this.urlSchema
      .insert({
        'long-url': url,
        'created-date': date,
      })
      .toQuery();

    // execute the insert query and return the id
    const result = await this.query(query);
    return result[0].insertId;
  }

  /**
   * retrieve a url by the id
   * @param  {Number} id id of the url to retrieve
   * @return {Promise}   promise that resolves to the url
   */
  async findUrl(id) {
    const query = this.urlSchema
      .select(this.urlSchema['long-url'])
      .from(this.urlSchema)
      .where(this.urlSchema.id.equals(id))
      .toQuery();

    // execute the select query and return the url
    const result = await this.query(query);
    return result[0][0]['long-url'];
  }
}

export default Database;
