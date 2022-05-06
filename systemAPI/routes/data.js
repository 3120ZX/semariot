const router = require('express').Router();
const parkingData = require('../model/parkingData');
const sensors = require('../model/sensors');
//telemetry

router.post('/parkingData', async (req,res) =>{
    //Create a new data telemetry
    const data = new parkingData({
        parkingAvailable: req.body.parkingAvailable
    });
    try{
        const savedData = await data.save();
        res.send("success");
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/sensors', async (req,res) =>{
    //Create a new data telemetry
    const data = sensors.findOneAndUpdate({
        car1: req.body.car1,
        car2: req.body.car2,
        car3: req.body.car3,
        car4: req.body.car4,
        car5: req.body.car5
    });
    try{
        const savedData = await data;
        res.send("success");
    }catch(err){
        res.status(400).send(err);
    }
}); 

//get latest data req GET
router.get('/parkingData', async (req,res) =>{
    parkingData.find().then(function(records){
         res.send(JSON.stringify(records[records.length-1].parkingAvailable))
      });
});

router.get('/sensors/1', async (req,res) =>{
    sensors.find().then(function(records){
        // res.send(JSON.stringify(records[0].led))
        res.send(records[records.length-1].car1)
      });
});
router.get('/sensors/2', async (req,res) =>{
    sensors.find().then(function(records){
        // res.send(JSON.stringify(records[0].led))
        res.send(records[records.length-1].car2)
      });
});
router.get('/sensors/3', async (req,res) =>{
    sensors.find().then(function(records){
        // res.send(JSON.stringify(records[0].led))
        res.send(records[records.length-1].car3)
      });
});
router.get('/sensors/4', async (req,res) =>{
    sensors.find().then(function(records){
        // res.send(JSON.stringify(records[0].led))
        res.send(records[records.length-1].car4)
      });
});
router.get('/sensors/5', async (req,res) =>{
    sensors.find().then(function(records){
        // res.send(JSON.stringify(records[0].led))
        res.send(records[records.length-1].car5)
      });
});

module.exports = router;