const router = require('express').Router();
const passport = require('passport');
const createError = require('http-errors');

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