const express = require('express');
const router = express.Router();

router.use('/', (req, res) => {
    if (req.user) {
        res.end(JSON.stringify(req.user));
    }
    else {
        res.end('hello world');
    }
});

module.exports = router;
