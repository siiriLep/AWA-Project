var express = require('express');
var router = express.Router();
const User = require('../models/User');

router.post('/user/register', function(req, res, next) {
    
    // Check if user with the given email already exists
    User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username }] }).then((user) => { // Tutki mogon or:ia nii saa usernamen mukaan :)
        if (user) {
            return res.status(403).json({ message: "Email or username already in use" })
        } else {
            console.log(req.body)
            User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            return res.status(200).json({ message: "Success"})
        }
    })

});

module.exports = router;