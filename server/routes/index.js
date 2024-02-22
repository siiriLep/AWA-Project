var express = require('express');
var router = express.Router();
const User = require('../models/User');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
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

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sendMessage', passport.authenticate('jwt', {session: false}), (req, res) => {
  // get the user sending and the user receiving the message from request
  const sender = req.user.username
  const receiver = req.body.username

  // Find Chat document where users list contains the sender and the receiver
  Chat.findOne({ users: { $all: [sender, receiver] }}).then((chat) => {
    // Create the message
    Message.create({
      sender: sender,
      message: req.body.message
    })
    .then(newMsg => {
      // Push the message to the chat document
      chat.messages.push(newMsg)
      chat.save()
      return res.status(200).json({ message: "Success"})
    })
  })  
})

router.post('/getMessages', passport.authenticate('jwt', {session: false}), (req, res) => {
  return res.status(200).json({ message: "Success"})
})




module.exports = router;
