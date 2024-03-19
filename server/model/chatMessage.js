const mongoose = require("mongoose");
const User = require("../model/user")
const ChatModel = require("../model/chatModel");

const chatMessageSchema = mongoose.Schema({
    sender: {
        type : mongoose.Schema.Types.Mixed,
        ref: 'Users',
        required : true
    },
    content : {
        type : String,
        required : true
    },
    chatModel: {
        type : mongoose.Schema.Types.Mixed,
        ref: 'ChatModel',
        required : true
    }},
    {timestamps: true}
)

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema)
module.exports = ChatMessage