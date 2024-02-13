var express = require('express');
var router = express.Router();
const User = require('../models/User');

router.post('/user', function(req, res, next) {
    console.log(req.body)
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    return res.sendStatus(200)

});

module.exports = router;