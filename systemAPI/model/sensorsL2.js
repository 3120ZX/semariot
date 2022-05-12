const mongoose = require('mongoose');

const GPIOSchema = new mongoose.Schema({
    car5:{
        type: Boolean,
        required:true,
    },
    car6:{
        type: Boolean,
        required:true,
    },
    car7:{
        type: Boolean,
        required:true,
    },
    car8:{
        type: Boolean,
        required:true,
    }
});

module.exports = mongoose.model('sensorsL2', GPIOSchema);