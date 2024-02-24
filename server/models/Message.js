const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let messageSchema = new Schema ({
    sender: String,
    message: String,
    timestamp: { type: Date, default: Date.now }
})

module.exports = mongoose.model("messages", messageSchema);