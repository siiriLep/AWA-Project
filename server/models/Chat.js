const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let chatSchema = new Schema ({
    users: [String],
    messages: [{
        sender: String,
        message: String,
        timestamp: { type: Date, default: Date.now }
    }]
})

module.exports = mongoose.model("chats", chatSchema);