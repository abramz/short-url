[![Build Status](https://travis-ci.org/abramz/short-url-proxy.svg)](https://travis-ci.org/abramz/short-url-proxy)
# short-url-proxy
- Proxies requests for front-end assets to a Google Cloud Storage bucket containing the static files
- Proxies all other requests to the an API

# Run
## Environment Variables
Variable   | Description
-----------|-----------------------------------
API_PORT   | Port for your API
FRONT_ADDR | Address to proxy static front end

## Docker
```
$ docker run --name proxy -e API_PORT=9001 FRONT_ADDR=localhost:9002 -d proxy:tag
```
