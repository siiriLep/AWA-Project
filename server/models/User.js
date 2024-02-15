const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema ({
    username: String,
    about: String,
    email: String,
    password: String

});

module.exports = mongoose.model("users", userSchema);
