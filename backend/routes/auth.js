const router = require('express').Router();
const passport = require('passport');

router.get('/callback', passport.authenticate('auth0', {failureRedirect: '/login'}), (req, res) => {
    if (!req.user) {
        throw new Error('user null');
    }

    res.redirect('/');
});

module.exports = router;