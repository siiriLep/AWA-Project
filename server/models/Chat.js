const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let chatSchema = new Schema ({
    users: [String],
    messages: [{
        sender: String,
        message: String
    }]
})

module.exports = mongoose.model("chats", chatSchema);