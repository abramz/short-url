[![Build Status](https://travis-ci.org/abramz/short-url-api.svg)](https://travis-ci.org/abramz/short-url-api)
[![Code Climate](https://codeclimate.com/github/abramz/short-url-api/badges/gpa.svg)](https://codeclimate.com/github/abramz/short-url-api)
[![Test Coverage](https://codeclimate.com/github/abramz/short-url-api/badges/coverage.svg)](https://codeclimate.com/github/abramz/short-url-api/coverage)

# short-url-api
NodeJS API for ShortUrl.
- Returns a shortened url when a long url is POSTed to '/'
- Returns an enlarged url when a short url is GETed to '/'

# Requirements
- node/iojs & npm
- A MySQL instance
- ```npm install -g pm2```
- ```npm install```

## Development Requirements
- ```npm install -g mocha istanbul eslint```

# Run
## Environment Variables
Variable     | Description                                                                                      | Default
-------------|--------------------------------------------------------------------------------------------------|--------
HOST         | host to listen on                                                                                | '127.0.0.1'
PORT         | port to listen on                                                                                | 3000
SQL_HOST     | hostname of the SQL instance                                                                     | '127.0.0.1'
SQL_PORT     | port of the SQL instance                                                                         | 3306
SQL_DB       | SQL DB on ${SQL_HOST} to store urls                                                              | 'shorturl'
SQL_TABLE    | SQL table in ${SQL_DB} to store urls                                                             | 'urls'
SQL_USER     | SQL user to perform db options as, needs SELECT and INSERT permissions on ${SQL_DB}.${SQL_TABLE} | 'shorturl-user'
SQL_PASSWORD | password for SQL_USER                                                                            | ''
SB_KEY       | API Key for Google's Safe Browsing Lookup API                                                    |
DEBUG        | namespaces for [debug](https://www.npmjs.com/package/debug)                                      |

## Manual
```bash
$ SB_KEY=MySafeBrowsingKey DEBUG=* npm start
```
## PM2
```bash
$ SB_KEY=MySafeBrowsingKey DEBUG=* pm2 start ./bin/www
```

## Docker
```bash
$ docker run --name api -v /path/to/src:/usr/src/app/ -e SB_KEY=MySafeBrowsingKey DEBUG=* -d api:tag
```
# Scripts
Name          | Description
--------------|------------
start         | start the webapp
lint          | lint source and tests
test          | run ```lint``` and ```test:coverage```
test:once     | run tests once
test:watch    | run tests once and then on file changes
test:coverage | run tests once and output coverage info
