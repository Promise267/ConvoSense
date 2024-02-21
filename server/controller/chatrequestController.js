const mongoose = require("mongoose");
const ChatRequest = require("../model/chatRequest")

module.exports = {
    POSTChatRequest: (req, res) => {
        const {senderId, receiverId} = req.body
        const newChatRequest = new ChatRequest({
            senderId : senderId,
            receiverId : receiverId,
            status : "pending"
        })

        ChatRequest.findOne({senderId : senderId , receiverId : receiverId}).then((existingRequest) => {
            if(existingRequest){
                res.status(409).json({message : "Chat Request already sent"});
            }
            else{
                newChatRequest.save().then((result) => {
                    res.json({message : "Chat Request sent!"})
                }).catch((err) => {
                    res.send(err)
                    console.log(err);
                });
            }
        }).catch((err) => {
            res.json({message : "User does not exist"})
            console.log(err);
        });
    },

    GETChatRequest : (req, res) => {
        const {userId} = req.body

        ChatRequest.find({ receiverId: userId })
            .then((results) => {
                res.send(results);
                console.log(results);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ message: "Failed to fetch chat requests" });
            });
    },

    GETSentChatRequest : (req, res) => {
        const {userId} = req.body

        ChatRequest.find({ senderId: userId })
            .then((results) => {
                res.send(results);
                console.log(results);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ message: "Failed to fetch sent chat requests" });
            });
    },

    PATCHApproveRequest : (req, res) =>{
        const {chatrequestId, userId } = req.body;

        ChatRequest.findOneAndUpdate({_id : chatrequestId, receiverId : userId},{status : "approved"},{new:true}).then((updatedRequest) => {
                if (!updatedRequest) {
                    return res.status(404).json({ message: "Chat Request not found" });
                }
                res.status(200).json({ message: "Chat Request approved", request: updatedRequest });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ message: "Failed to approve chat request" });
            });
    },

    DELETEChatRequest : (req, res) =>{
        const {chatrequestId, userId } = req.body;

        ChatRequest.findOneAndDelete({ _id: chatrequestId, receiverId: userId })
        .then((deletedRequest) => {
            if (!deletedRequest) {
                return res.status(404).json({ message: "Chat Request not found for the user" });
            }
            res.status(200).json({ message: "Chat Request deleted", request: deletedRequest });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Failed to delete chat request" });
        });
    },

    DELETESentChatRequest : (req, res) =>{
        const {chatrequestId, userId } = req.body;

        ChatRequest.findOneAndDelete({ _id: chatrequestId, senderId: userId })
        .then((deletedRequest) => {
            if (!deletedRequest) {
                return res.status(404).json({ message: "Chat Request not found for the user" });
            }
            res.status(200).json({ message: "Chat Request deleted", request: deletedRequest });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Failed to delete chat request" });
        });
    }
}