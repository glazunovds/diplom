const express = require('express');
const router = express.Router();

router.use('/', (req, res) => {
    res.end('Hello world');
});

module.exports = router;
