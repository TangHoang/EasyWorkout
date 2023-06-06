const router = require("express").Router();
const mongoose = require("mongoose");
const trainingdata = require('../models/data-model');

router.get("/get", (req, res, next) => {
    trainingdata.findOne({})
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
    const newTrainingdata = new trainingdata(req.body);
    const existingTrainingdata = trainingdata.findOne({})
        .then(existingTrainingdata => {
            if(existingTrainingdata) {
                let objectId = new mongoose.Types.ObjectId(existingTrainingdata._id);
                trainingdata.findByIdAndDelete(objectId)
                    .then(() => {
                        console.log("Deleted existing data");
                    })
                    .catch(error => {
                        console.error(error);
                        next();
                    });
            }else {
                console.log("No existing data found");
            }
        })
        .catch(error => {  
            console.error(error);
            next(); 
        });

    newTrainingdata.save();
});

module.exports = router;