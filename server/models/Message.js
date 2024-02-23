const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let messageSchema = new Schema ({
    sender: String,
    message: String,
})

module.exports = mongoose.model("messages", messageSchema);