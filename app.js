var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var dotenv = require('dotenv')
var db_connection = require('./config/db_connection')
var PORT = process.env.PORT || 8000
var categoryRouter = require('./routes/category');
var usersRouter = require('./routes/users');
var profileRouter = require('./routes/profile_title')
var likeCommentRouter = require('./routes/likesCommentsRoutes')
var titleRouter = require('./routes/title_routes')
var profileCategoryRouter = require('./routes/profile_category_router')

var app = express();

dotenv.config({
  path:"./config/config.env"
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/api/v1', categoryRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/profile' , profileRouter)
app.use('/api/v1' , likeCommentRouter)
app.use('/api/v1/title' , titleRouter)
app.use('/api/v1/usercategory' , profileCategoryRouter)

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

app.listen(PORT,() => {
  console.log(`Listening to port ${PORT}`)
})

module.exports = app;
