const mongoose = require("mongoose");

const chatMessageSchema = mongoose.Schema({
    sender: {
        type : mongoose.Schema.Types.Mixed,
        ref: 'Users',
        required : true
    },
    content : {
        type : String
    },
    image : {
        type : Buffer
    },
    chatModel: {
        type : mongoose.Schema.Types.Mixed,
        ref: 'ChatModels',
        required : true
    }},
    {timestamps: true}
)

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema)
module.exports = ChatMessage;