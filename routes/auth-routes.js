const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
    res.send("login");
});

// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile'],
}));

// auth logout
router.get('/logout', (req, res) => {
    res.send("logging out");
});

router.get("/google/redirect", passport.authenticate("google"), (req, res) => { // passport.authenticate again, to decrypt "code/token" from google and grab info
    res.send("you reached the redirect URI");
});

module.exports = router;

