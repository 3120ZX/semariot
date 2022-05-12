const mongoose = require('mongoose');

const GPIOSchema = new mongoose.Schema({
    search:{
        type: Number,
        required:true,
    },
    date: {
        type: Date,
        default: Date.now() + 25200000 //7 Hours in milli Scds
    }
});

module.exports = mongoose.model('parkingData', GPIOSchema);