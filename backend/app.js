const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const session = require('express-session');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn('/unauthorized');

mongoose.connect('mongodb://admin:admin@ds111370.mlab.com:11370/diplom');

const User = require('./models/User');

const authRouter = require('./routes/auth');
const projectsRouter = require('./routes/projects');

const app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(logger('dev'));
app.use(bodyParser.json({strict: false}));
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
    try {
        User.findOne({'auth0_id': profile.id}, (err, user) => {
            if (err) {
                console.error(err);
                return done(err);
            }

            if (!user) {
                new User({
                    auth0_id: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                })
                    .save((err, user) => {
                        if (err) {
                            console.error(err);
                        }
                        done(null, user);
                    });

            }
            else {
                done(null, user);
            }
        });
    }
    catch (e) {
        console.error(e);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, done);
});

app.use('/', authRouter);
app.use('/projects',/* ensureLoggedIn,*/ projectsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).end(JSON.stringify(createError(404)));
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