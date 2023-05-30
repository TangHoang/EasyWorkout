const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { MongoClient } = require('mongodb');

// Connection URL and database name
const dev_db_url = "mongodb+srv://user:default@cluster0.bytlthi.mongodb.net/workout_app?retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
const dbName = 'workout_app';
const port = process.env.PORT || 3000;

// Create MongoClient and Express App
const client = new MongoClient(mongoDB);
const app = express();

async function connectToMongoDB() {
    try {
        // Connect to MongoDB Atlas
        await client.connect();
        console.log('Connected successfully to MongoDB Atlas');
        app.listen(port, () => {
            console.log(`Server listening on PORT: ${port}`);
        })
        // Continue with your database operations here
  
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas:', err);
  }
}
connectToMongoDB();

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '/EasyWorkout/index.html'));
  });
  
app.use('/', express.static(__dirname));

app.get("/api/get", async (req, res, next) => {
    const db = client.db(dbName);
    const collection = db.collection('trainingdata');
    const document = collection.find({}).toArray();
    (await document).forEach(document => {
        try {
            res.json(document);
        } catch(error) {
            console.error(error);
            next();
        }
    })
})

app.post("/api/post", async (req, res, next) => {
    const data = req.body;
    const db = client.db(dbName);
    const collection = db.collection('trainingdata');
    collection.deleteMany({}, (err, client) => {
        if(err) {
            console.error("Error connecting to MongoDB", err);
            next();
            return;
        }
    });

    collection.insertOne(data, function(err, result) {
        if (err) {
          console.error('Error inserting data into MongoDB:', err);
          res.status(500).send('Error inserting data into MongoDB');
          return;
        }
  
        res.status(200).send('Data inserted into MongoDB');
    });
});

