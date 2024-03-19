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
    }
}