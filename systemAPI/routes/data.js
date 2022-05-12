const router = require('express').Router();
const parkingData = require('../model/parkingData');
const sensorsL1 = require('../model/sensorsL1');
const sensorsL2 = require('../model/sensorsL2');
//telemetry

var GRavailability;
var green = 8;
var red;

router.post('/parkingData', async (req,res) =>{
    //Create a new data telemetry
    const data = new parkingData({
        search: req.body.search
    });
    try{
        const savedData = await data.save();
        res.send("success");
    }catch(err){
        res.status(400).send(err);
    }
});

router.post('/sensors1', async (req,res) =>{
    // update new data telemetry
    const data = sensorsL1.findOneAndUpdate({
        car1: req.body.car1,
        car2: req.body.car2,
        car3: req.body.car3,
        car4: req.body.car4 
    });
    try{
        const savedData = await data;
        res.send("success");
    }catch(err){
        res.status(400).send(err);
    }
}); 

router.post('/sensors2', async (req,res) =>{
     // update new data telemetry
     const data = sensorsL2.findOneAndUpdate({
        car5: req.body.car5,
        car6: req.body.car6,
        car7: req.body.car7,
        car8: req.body.car8 
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
    sensorsL1.find().then(function(records1){
        sensorsL2.find().then(function(records2){
            GRavailability = 
                [
                    records1[records1.length-1].car1,
                    records1[records1.length-1].car2,
                    records1[records1.length-1].car3,
                    records1[records1.length-1].car4,
                    records2[records2.length-1].car5,
                    records2[records2.length-1].car6,
                    records2[records2.length-1].car7,
                    records2[records2.length-1].car8
                ]
                red = GRavailability.filter(value => value == true).length;

            parkingData.find().then(function(recordsp){
            res.send(JSON.stringify(
                {"available": green, 
                "searching": recordsp[recordsp.length-1].search + green, 
                "occupied": red})
            )
            });
        });
    });
});
//////Sensor 1
router.get('/sensors/1', async (req,res) =>{
    sensorsL1.find().then(function(records){
        // res.send(JSON.stringify(records[0].led))
        res.send(records[records.length-1].car1)
      });
});
router.get('/sensors/2', async (req,res) =>{
    sensorsL1.find().then(function(records){
        // res.send(JSON.stringify(records[0].led))
        res.send(records[records.length-1].car2)
      });
});
router.get('/sensors/3', async (req,res) =>{
    sensorsL1.find().then(function(records){
        // res.send(JSON.stringify(records[0].led))
        res.send(records[records.length-1].car3)
      });
});
router.get('/sensors/4', async (req,res) =>{
    sensorsL1.find().then(function(records){
        // res.send(JSON.stringify(records[0].led))
        res.send(records[records.length-1].car4)
      });
});

//sensors2 
router.get('/sensors/5', async (req,res) =>{
    sensorsL2.find().then(function(records){
        // res.send(JSON.stringify(records[0].led))
        res.send(records[records.length-1].car5)
      });
});
router.get('/sensors/6', async (req,res) =>{
    sensorsL2.find().then(function(records){
        // res.send(JSON.stringify(records[0].led))
        res.send(records[records.length-1].car6)
      });
});
router.get('/sensors/7', async (req,res) =>{
    sensorsL2.find().then(function(records){
        // res.send(JSON.stringify(records[0].led))
        res.send(records[records.length-1].car7)
      });
});
router.get('/sensors/8', async (req,res) =>{
    sensorsL2.find().then(function(records){
        // res.send(JSON.stringify(records[0].led))
        res.send(records[records.length-1].car8)
      });
});

router.get('/getSensors1', async (req,res) =>{
    sensorsL1.find().then(function(records){
        // res.send(JSON.stringify(records[0].led))
        res.send(JSON.stringify
            ([
                records[records.length-1].car1,
                records[records.length-1].car2,
                records[records.length-1].car3,
                records[records.length-1].car4
            ]))
        });
});

router.get('/getSensors2', async (req,res) =>{
    sensorsL2.find().then(function(records){
        // res.send(JSON.stringify(records[0].led))
        res.send(JSON.stringify
            ([
                records[records.length-1].car5,
                records[records.length-1].car6,
                records[records.length-1].car7,
                records[records.length-1].car8
            ]))
        });
});


module.exports = router;