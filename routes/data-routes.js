const router = require("express").Router();
const mongoose = require("mongoose");
const trainingdata = require('../models/data-model');

router.get("/get", (req, res, next) => {
    if(req.user == undefined) {
        req.user = {_id: "648adf185d512e841aef650a",
                    name: "Demo",
                    };
    }
    trainingdata.findOne({_id: req.user._id}, {_id: 0, __v: 0})
        .then(trainingdata => {
            if(trainingdata) {
                res.send(trainingdata);
            }else {
                res.send({});
            }
        })
        .catch(error => {
            console.error(error);
            next();
        }
    );
})

router.post("/post", (req, res, next) => {
    console.log(req.user);
    if(req.user == undefined) {
        req.user = {_id: "648adf185d512e841aef650a",
                    name: "Demo",
                    };
    }
    const newTrainingdata = new trainingdata(req.body);
    newTrainingdata._id = req.user._id;
    const existingTrainingdata = trainingdata.findOne({_id: req.user._id}, {_id: 1})
        .then(existingTrainingdata => {
            if(existingTrainingdata) {
                let objectId = new mongoose.Types.ObjectId(req.user._id);
                trainingdata.findByIdAndDelete(objectId)
                    .then(() => {
                        console.log("Deleted existing data");
                        newTrainingdata.save();
                        console.log("Saved new data");
                    })
                    .catch(error => {
                        console.error(error);
                        next();
                    });
            }else {
                console.log("No existing data found");
                newTrainingdata.save();
                console.log("Saved new data");
            }
        })
        .catch(error => {  
            console.error(error);
            next(); 
        });

    
});

module.exports = router;