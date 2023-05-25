const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require('mongodb');

// Connection URL and database name
const dev_db_url = "mongodb+srv://user:default@cluster0.bytlthi.mongodb.net/workout_app?retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
const dbName = 'workout_app';

// Create MongoClient and Express App
const client = new MongoClient(mongoDB);
const app = express();

async function connectToMongoDB() {
    try {
        // Connect to MongoDB Atlas
        await client.connect();
        console.log('Connected successfully to MongoDB Atlas');
        app.listen(3000, () => {
            console.log("Server listening on PORT: 3000");
        })
        // Continue with your database operations here
  
    } catch (err) {
        console.error('Error connecting to MongoDB Atlas:', err);
  }
}
connectToMongoDB();

app.use(bodyParser.json());

// Enable CORS middleware
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get("/data/get", async (req, res, next) => {
    const db = client.db(dbName);
    const collection = db.collection('trainingdata');
    const document = collection.find({}).toArray();
    (await document).forEach(document => {
        try {
            res.json(document);
        } catch(error) {
            console.error(error);
        }
    })
})

app.post("/data/post", async (req, res, next) => {
    const data = req.body;
    const db = client.db(dbName);
    const collection = db.collection('trainingdata');
    collection.deleteMany({}, (err, client) => {
        if(err) {
            console.error("Error connecting to MongoDB", err);
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

