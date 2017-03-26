var mongo = require('mongodb');
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var app = express();
var hbs = require('express-handlebars');

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,'/views'));
app.engine('.hbs', hbs({
  extname:'hbs',
  defaultLayout: 'main',
  partialsDir: path.resolve(__dirname , 'views/partials'),
  layoutsDir: path.resolve(__dirname , 'views/layouts'),
  helpers:{
    'dateToString':function(text) {
      console.log(text);
      return text;
    },
    'checkGuess':function(guess,actual){
      var sec = Math.round(Math.abs(guess.date.getTime()-actual.date.getTime())/1000);
      return Math.floor(sec/60);
    }
  }
}));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/users',users);
app.use('/api',api);

// passport config
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// mongoose
mongoose.connect('mongodb://localhost:45000/passport_local_mongoose_express4');
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});
// app.get('/', function(request, response) {
//    response.render('index');
// });
app.listen(3000);
