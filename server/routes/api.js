var express = require('express');
var router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const { token } = require('morgan');
var opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'TOP_SECRET';

passport.use(
    new JWTstrategy(opts, function (jwt_payload, done) {
        User.findOne({ email: jwt_payload.email })
            .then((user) => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch((err) => {
                return done(err, false);
            });
    })
);


router.post('/user/register', (req, res, next) => {
        if(!req.body.email || !req.body.password) {
        return res.status(401).json({ message: "Fill required fields" })
    }
    // Check if user with the given email or username already exists
    User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] }).then((user) => { 
        if (user) {
            return res.status(403).json({ message: "Email or username already in use" })
        } else {
            // Hash password with bcrypt and create a new user
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) throw err
                    User.create({
                        username: req.body.username,
                        about: 'Hello!',
                        email: req.body.email,
                        password: hash
                    })
                    return res.status(200).json({ message: "Success"})
                })
            })
        }
    })

});

router.post('/user/login', (req, res, next) => {

    console.log(req.body)
    // Try to find the user
    User.findOne({ email: req.body.email}).then((user) => {
        if (!user) { // If user is not found send message
            return res.status(401).json({ message: "Invalid credentials" })
        } else { // Check if password is correct
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err) {
                    throw err
                }
                if (isMatch) {  
                    const jwtPayload = {
                        email: user.email,
                    }
                    console.log(jwtPayload)
                    const token = jwt.sign(jwtPayload, 'TOP_SECRET');
                    return res.json({ token });
                    //return res.status(200).json({ message: "Success"})
                } else { // Send message to user if the password is wrong
                    return res.status(401).json({ message: "Invalid credentials" })
                }
            })

        }
    })
})


router.get('/main', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findOne({username: req.user.username}).then((user) => {
        if (!user) {
            return res.status(401).json({ message: "User not found" })
        } else {
            return res.status(200).json({user})
        }

    })
})

router.post('/user/about', (req, res, next) => {

    User.findOne({username: req.body.username}).then((user) => {
        if (!user) {
            return res.status(401).json({ message: "Very weird error" })
        } else {
            user.about = req.body.about
            user.save()
            console.log(user)
            return res.status(200).json({ message: user.about })
        }
    })

})

router.post('/user/info', (req, res, next) => {
    console.log(req.body)
    User.findOne({username: req.body.username}).then((user) =>{
        about = user.about
        console.log(about)
        return res.status(200).json({ message: about })

    })


})

module.exports = router;