const router = require('express').Router();
const passport = require('passport');
const createError = require('http-errors');

router.get('/login', passport.authenticate('auth0', {}), (req, res) => {
        res.redirect('/');
    }
);

router.get('/callback', passport.authenticate('auth0', {failureRedirect: '/login'}), (req, res) => {
    if (!req.user) {
        throw new Error('user null');
    }

    res.redirect('/');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/me', (req, res) => {
    res.end(JSON.stringify(req.user || {}));
});

router.get('/unauthorized', (req, res) => {
    res.status(401).end(JSON.stringify(createError(401)));
});

module.exports = router;