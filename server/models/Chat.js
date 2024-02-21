const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let chatSchema = new Schema ({
    users: [String],
    messages: [String]
})

module.exports = mongoose.model("chats", chatSchema);