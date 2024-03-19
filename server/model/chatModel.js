const mongoose = require("mongoose");

const chatModelSchema = mongoose.Schema({
    users : [
        {type : mongoose.Schema.Types.Mixed,
        ref : 'Users'
    }],
    latestMessage: {
        type: mongoose.Schema.Types.Mixed,
        ref: "Message",
    }
})

const ChatModel = mongoose.model("ChatModel", chatModelSchema);
module.exports = ChatModel;