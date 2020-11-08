var express = require('express');
const { render } = require('../app');
var router = express.Router();

router.get('/', function(req, res, next) {
    render('index.html');
});

module.exports = router;