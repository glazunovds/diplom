const router = require('express').Router();
const passport = require('passport');
const createError = require('http-errors');

/*router.get('/login', passport.authenticate('auth0', {}), (req, res) => {
    res.redirect('//localhost:3000/');
});

router.get('/callback', passport.authenticate('auth0', {failureRedirect: '/login'}), (req, res) => {
    if (!req.user) {
        throw new Error('user null');
    }

    res.redirect('//localhost:3001/me');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('//localhost:3000/');
});*/

router.get('/me', (req, res) => {
    if (req.isAuthenticated()) {
        res.end(JSON.stringify(req.user));
    }
    else {
        res.status(401).end(JSON.stringify(createError(401)));
    }
});

router.get('/unauthorized', (req, res) => {
    res.status(401).end(JSON.stringify(createError(401)));
});

module.exports = router;