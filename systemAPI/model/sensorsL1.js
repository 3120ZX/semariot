const mongoose = require('mongoose');

const GPIOSchema = new mongoose.Schema({
    car1:{
        type: Boolean,
        required:true,
    },
    car2:{
        type: Boolean,
        required:true,
    },
    car3:{
        type: Boolean,
        required:true,
    },
    car4:{
        type: Boolean,
        required:true,
    }
});

module.exports = mongoose.model('sensorsL1', GPIOSchema);