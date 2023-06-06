require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
    done(null, user.id); // user.id is the id in the database
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    })
});

passport.use( 
    new GoogleStrategy({
    // options for the google strategy
    callbackURL: '/auth/google/redirect',
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser) {
                console.log("user is: " + currentUser);
                done(null, currentUser);
            }else {     
                new User({
                    name: profile.displayName,
                    googleId: profile.id,
                }).save().then((newUser) => {  
                    console.log("new user created: " + newUser);
                    done(null, newUser);
                });
            }
        });
    }
));