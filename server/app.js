var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var api = require('./routes/api');
var cors = require('cors')
var passport = require('passport');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());


const mongoose = require("mongoose");
const mongoDB = "mongodb://127.0.0.1:27017/project"
mongoose.connect(mongoDB)
mongoose.Promise = Promise
const db = mongoose.connection
db.on("error", console.error.bind(console, "database error"))

if (process.env.NODE_ENV === "development") {
    var corsOptions = {
        origin: "http//localhost:3000",
        optionsSuccessStatus: 200,
    }
    app.use(cors(corsOptions))
}


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', api)
module.exports = app;
