/*!
 * ShortUrl
 * Copyright(c) 2015 Andrew Shapro
 * MIT Licensed
 */

import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import routes from './routes/index';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('trust proxy', true);
app.use(['/', '/*'], routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((error, req, res) => {
    res.status(error.status || 500);
    res.render('error', {
      error,
      message: error.message,
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.render('error', {
    message: error.message,
    error: {},
  });
});

export default app;
