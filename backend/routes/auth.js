const router = require('express').Router();
const createError = require('http-errors');

const User = require('../models/User');

router.get('/me', (req, res) => {
    if (req.isAuthenticated()) {
        res.end(JSON.stringify(req.user));
    }
    else {
        res.status(401).end(JSON.stringify(createError(401)));
    }
});

router.post('/me', async (req, res, next) => {
    try {
        let user = await User.findByIdAndUpdate(req.user._id, req.body);

        req.login(user, (err) => {
            if (err) return next(err);

            res.end(JSON.stringify(user));
        });
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;