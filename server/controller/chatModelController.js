const mongoose = require("mongoose");
const User = require("../model/user")
const ChatModel = require("../model/chatModel");
const ChatRequest = require("../model/chatRequest");

module.exports = {
    GETAllChatModels : (req, res) => {
        ChatModel.find().then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err);
        });
    },

    GETChatModel : (req, res) => {
        const {chatmodelId} = req.body
        try {
            ChatModel.find({_id : chatmodelId}).then((result) => {
                res.send(result)
            }).catch((err) => {
                console.log(err);
                res.status(500).json({ message: "Failed to fetch chat requests" });
            });
        } catch (error) {
            console.error(err);
            res.status(500).json({message: "Internal Server Error"});
        }
    }
}