var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;

global.document = document;
global.$ = require("jquery")(window);

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var hallRouter = require('./routes/hall');
var galleryRouter = require('./routes/gallery');
var contactRouter = require('./routes/contact');
var usersRouter = require('./routes/users');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/sobre', aboutRouter);
app.use('/salao', hallRouter);
app.use('/contato', contactRouter);
app.use('/fotos', galleryRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(process.env.port || 2000, () => {
  console.log('server listen on 2000');
});
module.exports = app;
