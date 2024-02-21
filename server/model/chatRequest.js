const mongoose = require("mongoose");

const chatRequestSchema = mongoose.Schema({
    senderId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required : true
    },
    receiverId: {
        type : mongoose.Schema.Types.ObjectId,
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