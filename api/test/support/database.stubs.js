/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */

var successfulInsertText = 'Insert successful';
var successId = 500;
var successfulFindText = 'Find successful';
var successfulUrl = 'http://example.com';
var unsuccessfulText = 'Will be unsuccessful';
var unsuccessfulResultText = 'Unsuccessful';

var mysql = {
  createPool: createPool
};

function createPool() {
  return {
    getConnection: getConnection
  };
}

function getConnection(callback) {
  var connection = {
    query: query,
    release: function () {
    }
  };

  callback(null, connection);
}

function query(text, values, callback) {
  if (text === successfulInsertText) {
    callback(null, [{insertId: successId}]);
  } else if (text === successfulFindText) {
    callback(null, [[{'long-url': successfulUrl}]]);
  } else if (text === unsuccessfulText) {
    callback(unsuccessfulResultText);
  }
}

var sql = {
  setDialect: function () {
  },
  define: define
};

function define() {
  return {
    insert: insert,
    id: {equals: equals},
    select: select
  };
}

function insert(opts) {
  var obj = {};
  if (opts['long-url'] === successfulUrl) {
    obj.text = successfulInsertText;
  } else {
    obj.text = unsuccessfulText;
  }
  obj.toQuery = toQuery;
  return obj;
}

function equals(id) {
  return id;
}

function select() {
  return {
    from: from
  };
}

function from() {
  return {
    where: where
  };
}

function where(id) {
  var obj = {};
  if (id === successId) {
    obj.text = successfulFindText;
  } else {
    obj.text = unsuccessfulText;
  }
  obj.toQuery = toQuery;
  return obj;
}

function toQuery() {
  return {text: this.text, values: []};
}

module.exports = {
  successfulInsertText: successfulInsertText,
  successId: successId,
  successfulFindText: successfulFindText,
  successfulUrl: successfulUrl,
  unsuccessfulText: unsuccessfulText,
  unsuccessfulResultText: unsuccessfulResultText,
  mysql: mysql,
  sql: sql
};
