const ChatMessage = require("../model/chatMessage");

module.exports = {
    POST : (req, res)=>{
        const {chatrequestId, senderId, recieverId, message, imageURL, videoURL, fileURL, voiceMessageURL, timestamp} = req.body
        const newMessage = new ChatMessage({
            chatrequestId,
            senderId,
            recieverId,
            message,
            imageURL,
            videoURL,
            fileURL,
            voiceMessageURL,
            timestamp
        })

        newMessage.save().then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err)
            console.log(err);
        });
    },

    GET: (req, res) => {
        const { senderId, receiverId } = req.body;
        ChatMessage.find({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).then((messages) => {
            res.json(messages);
        }).catch((err) => {
            res.send(err);
            console.log(err);
        });
    }
}