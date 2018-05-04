const router = require('express').Router();

const User = require('../models/User');

router.get('/:user_id', async (req, res, next) => {
    try {
        let {user_id} = req.params;

        let user = await User.findById(user_id);

        res.end(JSON.stringify(user));
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;