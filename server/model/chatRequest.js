const mongoose = require("mongoose");

const chatRequestSchema = mongoose.Schema({
    sender: {
        type : mongoose.Schema.Types.Mixed,
        ref: 'Users',
        required : true
    },
    receiver: {
        type : mongoose.Schema.Types.Mixed,
        ref: 'Users',
        required : true
    },
    status: {
        type : String,
        enum : ["pending", "accepted", "rejected"],
        default: "pending"
    },
})

const ChatRequest = mongoose.model("ChatRequest", chatRequestSchema);
module.exports = ChatRequest;