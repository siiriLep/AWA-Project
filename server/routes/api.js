var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Chat = require('../models/Chat');
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

// Used to register new users. Gets username, email and password from request body
router.post('/user/register', (req, res) => {
    console.log(req.body)
    // Check if email and password are provided
    if(!req.body.email || !req.body.password) {
        return res.status(401).json({ message: "Fill required fields" })
    }
    // Check if user with the given email or username already exists
    User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] }).then((user) => { 
        if (user) { 
            // If a user already exists, give a message to client
            return res.status(403).json({ message: "Email or username already in use" })
        } else {
            // Hash and salt password with bcrypt and create a new user
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return res.status(403).json({ message: err })
                }
                bcrypt.hash(req.body.password, salt, (err, hash) => {
                    if (err) {
                        return res.status(403).json({ message: err })
                    }
                    // Create a user to the database
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

})

// Used to log in users. Gets email and password from request body
router.post('/user/login', (req, res) => {
    // Try to find the user
    User.findOne({ email: req.body.email}).then((user) => {
        if (!user) { // If user is not found send message
            return res.status(401).json({ message: "Invalid credentials" })
        } else { // Check if password is correct
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err) {
                    throw err
                }
                // If the password is correct, create JWT
                if (isMatch) {  
                    const jwtPayload = {
                        email: user.email,
                        username: user.username,
                    }
                    const token = jwt.sign(jwtPayload, 'TOP_SECRET',
                    // Token expires in an hour
                    {
                        expiresIn: 3600
                    })
                    return res.json({ token });
                } else { // Send message to user if the password is wrong
                    return res.status(401).json({ message: "Invalid credentials" })
                }
            })

        }
    })
})

// Checks if the JWT contains the correct information
router.get('/main', passport.authenticate('jwt', {session: false}), (req, res) => {
    User.findOne({username: req.user.username}).then((user) => {
        if (!user) {
            return res.status(401).json({ message: "User not found" })
        } else {
            return res.status(200).json({user})
        }

    })
})

// Change about section
router.post('/user/about', (req, res, next) => {
    User.findOne({username: req.body.username}).then((user) => {
        if (!user) {
            return res.status(401).json({ message: "error in finding user" })
        } else {
            user.about = req.body.about
            user.save()
            return res.status(200).json({ message: user.about })
        }
    })
})

// Get users about section from the database
router.post('/user/info', (req, res, next) => {
    User.findOne({username: req.body.username}).then((user) =>{
        if (!user) {
            return res.status(401).json({ message: "error in finding user" })
        } else {
        about = user.about
        about = user.about
        console.log(about)
            about = user.about
        console.log(about)
            return res.status(200).json({ message: about })
        }
    })
})


// Finds a random user from the database
router.get('/random', passport.authenticate('jwt', {session: false}), (req, res) => {
    const currentUser = req.user.username;
    // Find current users liked and disliked users from the database
    User.findOne({username: currentUser}).then((user) => {
        let liked = user.liked
        let disliked = user.removed
        // Finds a random user      that is not equal to current user 
        User.aggregate([{ $match: { username: { $ne: currentUser } } },
            { $match: { username: { $nin: liked } } }, // User that is not in the current users liked list
            { $match: { username: { $nin: disliked } } }, // User that is not in the current users disliked list
            { $sample: { size: 1 } }])  // Finds exactly one user
            .then((user) => {
            // If there are no more users available, send a message
            if (!user) {
                return res.status(500).json({message: 'No more users'})
            } else {
            // Send the user
                return res.status(200).json(user)
            }
        })
    })

})

// When user likes another user, push the liked user to users 'liked' list
router.post('/like', passport.authenticate('jwt', {session: false}), (req, res) => {
    const currentUser = req.user.username;
    // Finds the currently logged in user
    User.findOne({username: currentUser}).then((user) =>{
        if (!user) {
            return res.status(401).json({ message: "Error" })
        } else {
            // If user is found, add the liked user to users 'liked' list
            user.liked.push(req.body.username)
            user.save()
            return res.status(200).json({ message: "Success"})           
        }
    })    
})

// When user dislikes another user, push the disliked user to users 'removed' list
router.post('/dislike', passport.authenticate('jwt', {session: false}), (req, res) => {
    const currentUser = req.user.username;
    // Finds the currently logged in user and adds the disliked user to their 'disliked' list
    User.findOne({username: currentUser}).then((user) =>{
        if (!user) {
            return res.status(401).json({ message: "Error" })
        } else {
            user.removed.push(req.body.username)
            user.save()
            return res.status(200).json({ message: "Success"})
        }

    })    
})


// Finds users matches 
router.get('/matches', passport.authenticate('jwt', {session: false}), (req, res) => {
    const currentUser = req.user.username
    // Find currently logged in users liked list and save it as 'possibleMatches'
    User.findOne({ username: currentUser }).then(async (user) => {
        let possibleMatches = user.liked
        // Go through the users in possibleMatches list
        for (let likedUser of possibleMatches) {
            try {
                // Find the liked users information from the database
                let foundUser = await User.findOne({ username: likedUser })
                // Check if the user found from db has liked the current user
                if (foundUser && foundUser.liked.includes(currentUser)) {
                    // Check if the users have already matched with each other
                    if (!foundUser.matches.includes(currentUser)) {
                        // If both have liked eachother and have not matched, add each other to their matched lists
                        foundUser.matches.push(currentUser)
                        user.matches.push(foundUser.username)
                        // Create a chat for the new match
                        Chat.create({
                            users: [foundUser.username, currentUser],
                            messages: []
                        })
                        await foundUser.save()
                        await user.save()
                    }
                }
            } catch (err) {
                console.log(err)
            }
        }   
    return res.status(200).json({ matches: user.matches})
    })   
    
})


module.exports = router;