const express = require("express");
const expressSession = require("express-session");
const mongoose = require('mongoose');
const passport = require("passport");
const bodyParser = require("body-parser");
const path = require("path");
const authRoutes = require('./routes/auth-routes');
const dataRoutes = require('./routes/data-routes');
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
app.use(expressSession({ 
    secret: process.env.CLIENT_SECRET,
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/EasyWorkout/index.html"));
});
app.use("/", express.static(__dirname));
app.use("/auth", authRoutes);
app.use("/api", dataRoutes);
