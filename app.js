var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// New Code
var mongo = require('mongodb');
var monk = require('monk');

var url = process.env.MONGOLAB_URI;

if (url == null){
    url = 'localhost:27017/nodetest1';
}

//var db = monk('mongodb://heroku_n6tkc1zm:pcif411lc8v9sf1jdag1aogkmg@ds149511.mlab.com:49511/heroku_n6tkc1zm');
var db = monk(url);
//mongoose.connect(url);
//var db = mongoose.connection;

// Define schema
/*var Schema = mongoose.Schema;

var recipeModelSchema = new Schema ({
	recipeID: String,
	recipeImage: String,
	recipeIngredient: String,
	recipeSecondary: String,
	recipeTitle: String,
	recipeType: String,
	recipeServes: { type: Number, min: 1, max: 16 },
	recipeDifficulty: String,
	recipeDiets: String,
	recipeTime: String,
	recipeID: String
});

module.exports = mongoose.model('Recipes', recipeModelSchema);*/

var index = require('./routes/index');

//Global Vars 
global.appRoot = path.resolve(__dirname);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
