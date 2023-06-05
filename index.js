const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');

// Connection URL and database name
const dev_db_url = "mongodb+srv://user:default@cluster0.bytlthi.mongodb.net/workout_app?retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
const dbName = 'workout_app';
const port = process.env.PORT || 3000;
const app = express();

// connect to MongoDB with mongoose
async function connect() {
    try {
        await mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to MongoDB");
        app.listen(port, () => {
            console.log(`Server listening on PORT: ${port}`);
        })
    } catch(err) {
        console.error("Error connecting to MongoDB", err);
    }
}
connect();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.get("/", function (req, res) {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "/EasyWorkout/index.html"));
});
app.use("/", express.static(__dirname));
app.use("https://easyworkout-production.up.railway.app/auth", authRoutes);

// schemas
const dataSchema = new mongoose.Schema({
    date: Object,
}, {strict: false});

const historySchema = new mongoose.Schema({
    date: Object,
}, {strict: false});

const trainingdataSchema = new mongoose.Schema({
    data: dataSchema,
    currentExercises: Array,
    history: historySchema,
});
const trainingdata = mongoose.model('trainingdata', trainingdataSchema);

// routes
app.get("/api/get", (req, res, next) => {
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

app.post("/api/post", (req, res, next) => {
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

