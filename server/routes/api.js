var express = require('express');
var router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs')

router.post('/user/register', function(req, res, next) {
    
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
                        email: req.body.email,
                        password: hash
                    })
                    return res.status(200).json({ message: "Success"})
                })
            })
        }
    })

});

module.exports = router;