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

module.exports = router;

