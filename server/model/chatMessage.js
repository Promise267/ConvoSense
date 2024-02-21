const mongoose = require("mongoose");

const chatRequestSchema = mongoose.Schema({
    chatRequestId : {
        type:mongoose.Schema.Types.ObjectId,
        ref : "ChatRequest",
        required : true
    },
    senderId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    receiverId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    message: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    videoUrl: {
        type: String
    },
    fileUrl: {
        type: String
    },
    voiceMessageUrl: {
        type: String
    },
    timestamp : {
        type: Date,
        default: Date.now
    }
})

const ChatMessage = mongoose.model("ChatMessage", chatRequestSchema);
module.exports = ChatMessage;