var express = require('express');
var router = express.Router();
var TotoService = require('../services/toto.service');

var mongoose = require('mongoose');
var connectionUri = 'mongodb://@localhost:27017/wintoto';
mongoose.connect(connectionUri, {
    useMongoClient: true,
});

// get 'api/v1/totos'
router.get('/totos', function(req, res, next) {
    TotoService.getTotos()
        .then(totos => res.json(totos));
});

module.exports = router;
