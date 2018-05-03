const router = require('express').Router();
const createError = require('http-errors');

router.get('/me', (req, res) => {
    if (req.isAuthenticated()) {
        res.end(JSON.stringify(req.user));
    }
    else {
        res.status(401).end(JSON.stringify(createError(401)));
    }
});

module.exports = router;