var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.json({
        message: 'Api is working'
    })
});

module.exports = router;