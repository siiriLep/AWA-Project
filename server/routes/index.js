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
opts.secretOrKey = process.env.SECRET


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


router.post('/sendMessage', passport.authenticate('jwt', {session: false}), (req, res) => {
  // get the user sending and the user receiving the message from request
  const sender = req.user.username
  const receiver = req.body.username
  console.log(req.body.message)

  // Find Chat document where users list contains the sender and the receiver
  Chat.findOne({ users: { $all: [sender, receiver] }}).then((chat) => {
    // Create the message
    Message.create({
      sender: sender,
      message: req.body.message
    })
    .then(newMsg => {
      // Push the message to the chat document
      //chat.messages.push({sender: newMsg.sender, message: newMsg.message});
      console.log("uusi viesti")
      console.log({newMsg})
      chat.messages.push(newMsg)
      chat.save()
      return res.status(200).json({ message: "Success"})
    })
  })  
})

// Gets all the messages in a chat
router.post('/getMessages', passport.authenticate('jwt', {session: false}), (req, res) => {
  const sender = req.user.username
  const receiver = req.body.username

  // Finds a chat wich contains both users, sender and receiver
  Chat.findOne({ users: { $all: [sender, receiver] }}).then(chat => {
    messages = chat.messages
    console.log(messages)
    return res.status(200).send(messages)
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



module.exports = router;
