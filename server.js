const express = require("express");
const app = express();

const mongoose = require("mongoose");

const uri = "mongodb+srv://user:default@workoutapp.fq8rq1j.mongodb.net/?retryWrites=true&w=majority";

async function connect() {
    try {
       await mongoose.connect(uri);
       console.log("Connected to MongoDB");
    } catch(error) {
        console.error(error);
    }
}

connect();

app.listen(3000, () => {
    console.log("Connected to PORT:3000");
})