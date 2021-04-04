var mongoose = require('mongoose');

var TotoSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    lucks: {
        type: [Number],
        required: true,
    },
    additional: {
        type: Number,
        required: true,
    },
});

var Toto = mongoose.model('Toto', TotoSchema);

module.exports = Toto;