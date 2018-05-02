const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const session = require('express-session');

mongoose.connect('mongodb://admin:admin@ds111370.mlab.com:11370/diplom');

const User = require('./models/User');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'SECRET',
    resave: true,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    clientID: '38kYWZEnammXWakaZTnBlV8cgEgYuqVK',
    clientSecret: 'T4IX6UwzDLEJQvyITHCBuPwLhpdBTZK4RKK7LFm_Na4YP_MY_ZpctqCfuQTsJjOp',
    domain: 'glazunov.eu.auth0.com',
    callbackURL: 'http://localhost:3001/callback',
    responseType: 'code',
    scope: 'openid profile email',
}, (accessToken, refreshToken, extraParams, profile, done) => {
    return done(null, profile);
}));

app.use('/', authRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.end(err.stack);
});

module.exports = app;