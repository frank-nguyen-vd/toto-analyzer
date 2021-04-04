var Toto = require('../models/toto.model');
var TOTOS = require('../toto.mock');

var getTotos = function () {
    return new Promise((resolve, reject) => {
        // resolve(TOTOS);

        Toto.find({}, function(err, totos) {
            if (err) {
                reject(err);
            } else {
                resolve(totos);
            }
        }).sort({ number: -1 });
    });
};

module.exports = {
    getTotos
};