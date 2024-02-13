var express = require('express');
var router = express.Router();
const User = require('../models/User');

router.post('/user/register', function(req, res, next) {
    
    // Check if user with the given email already exists
    User.findOne({ email: req.body.email}).then((email) => { // Tutki mogon or:ia nii saa usernamen mukaan :)
        if (email) {
            return res.status(403).json({ message: "Email already in use" })
        } else {
            console.log(req.body)
            User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            })
            return res.sendStatus(200)
        }
    })

});

module.exports = router;