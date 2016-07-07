[![Build Status](https://travis-ci.org/abramz/short-url-front-end.svg)](https://travis-ci.org/abramz/short-url-front-end)
[![Code Climate](https://codeclimate.com/github/abramz/short-url-front-end/badges/gpa.svg)](https://codeclimate.com/github/abramz/short-url-front-end)
[![Test Coverage](https://codeclimate.com/github/abramz/short-url-front-end/badges/coverage.svg)](https://codeclimate.com/github/abramz/short-url-front-end/coverage)
# short-url-front-end
Front End for ShortUrl

# Requirements
- node/iojs & npm
- ruby & ruby gems
- npm install -g bower karma
- npm install && bower install

## Development Requirements
```npm install -g bower karma gulp```

# Run
```gulp serve```

# Test
- ```gulp karma:test``` - run tests on file change, runs in both Chrome and Firefox
- ```gulp karma:ci``` - run tests once, runs in PhantomJS
