const mongoose = require("mongoose");
const ChatRequest = require("../model/chatRequest")
const User = require("../model/user")
const ChatModel = require("../model/chatModel")

module.exports = {

    GETAllChatRequests : (req, res) => {
        ChatRequest.find().then((result) => {
            res.send(result)
        }).catch((err) => {
            console.log(err);
        });
    },

    POSTChatRequest: async (req, res) => {
        const {senderId, receiverId} = req.body;

        try {
            const sender = await User.findById(senderId).select(['-password', '-dateofbirth', "-friends"]);
            const receiver = await User.findById(receiverId).select(['-password', "-dateofbirth", "-friends"]);

            if (!sender || !receiver) {
                return res.status(404).json({message: "User does not exist"});
            }

            const newChatRequest = new ChatRequest({
                sender: sender,
                receiver: receiver,
                status: "pending"
            });

            const existingRequest = await ChatRequest.findOne({'sender._id': sender._id, 'receiver._id': receiver._id});

            if (existingRequest) {
                return res.status(409).json({message: "Chat Request already sent"});
            }


            await newChatRequest.save();
            //res.send(newChatRequest)
            res.json({message: "Chat Request sent!"});

        } catch (err) {
            console.error(err);
            res.status(500).json({message: "Internal Server Error"});
        }
    },

    GETChatRequest : async(req, res) => {
        const {userId} = req.body
        try {
            const user = await User.findById(userId);
    
            ChatRequest.find({ 'receiver._id': user._id })
                .then((results) => {
                    res.send(results);
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).json({ message: "Failed to fetch chat requests" });
                });
        } catch (error) {
            console.log(error);
        }

    },

    GETSentChatRequest : async(req, res) => {
        const {userId} = req.body

        const user = await User.findById(userId);

        ChatRequest.find({ 'sender._id': user._id })
            .then((results) => {
                res.send(results);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ message: "Failed to fetch sent chat requests" });
            });
    },

    PATCHApproveRequest : async(req, res) =>{
        const {chatrequestId, userId } = req.body;

        const RequestReceiver = await User.findById(userId);

        const updatedRequest = await ChatRequest.findOneAndUpdate({
            _id : chatrequestId,
            'receiver._id' : RequestReceiver._id},
            {status : "accepted"},
            {new:true}
        );

        const RequestSender = await User.findById(updatedRequest.sender._id)


        if (!updatedRequest) {
            return res.status(404).json({ message: "Chat Request not found" });
        }
        await updatedRequest.save();
        // Check if the sender is not already in the receiver's friends list
        if (!RequestReceiver.friends.some(friend => friend._id.toString() === updatedRequest.sender._id.toString())) {
            RequestReceiver.friends.push(updatedRequest.sender);
        }

        // Check if the receiver is not already in the sender's friends list
        if (!RequestSender.friends.some(friend => friend._id.toString() === updatedRequest.receiver._id.toString())) {
            RequestSender.friends.push(updatedRequest.receiver);
        }

        console.log("Request Sender : ", RequestSender);
        console.log("Request Receiver : ", RequestReceiver);

        await RequestReceiver.save();
        await RequestSender.save();
        RequestSender.friends = undefined;
        RequestReceiver.friends = undefined;
        const newChatModel = await ChatModel({
            users : [RequestSender, RequestReceiver]
        })
        await newChatModel.save();

        res.status(200).json({ message: "Chat Request approved", request: updatedRequest });

    },

    DELETEChatRequest : async(req, res) =>{
        const {chatrequestId, userId } = req.body;

        const user = await User.findById(userId);
        console.log(user);

        ChatRequest.findOneAndDelete({ _id: chatrequestId, 'receiver._id': user._id })
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

    DELETESentChatRequest : async(req, res) =>{
        const {chatrequestId, userId } = req.body;

        const user = await User.findById(userId);
        console.log(user);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        ChatRequest.findOneAndDelete({ _id: chatrequestId, 'sender._id': user._id })
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