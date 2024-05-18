const ChatMessage = require("../model/chatMessage");
const User = require("../model/user");
const ChatModel = require("../model/chatModel")


module.exports = {
    POSTChatMessage : async(req, res)=>{
        const {senderId, content, chatmodelId} = req.body
        const sender = await User.findById(senderId);
        const chatModel = await ChatModel.findById(chatmodelId);

        const newMessage = new ChatMessage({
            sender : sender,
            content,
            chatModel : chatModel,
        })

        await newMessage.save().then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err)
            console.log(err);
        });
    },

    GETChatMessage: async(req, res) => {
        const { chatmodelId } = req.body;
        try {
            const chatModel = await ChatModel.findById(chatmodelId)
            //console.log(chatModel._id);
            await ChatMessage.find({'chatModel._id' : chatModel._id}).then((result) => {
                res.send(result)
                //console.log(result);
            }).catch((err) => {
                console.log(err);
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Failed to fetch chat messages" });
        }
    },

    DELETEChatMessage : async(req, res) => {
        const {chatmessageId} = req.body
        const chatMessage = await ChatMessage.findById(chatmessageId)

        if(!chatMessage){
            return res.status(404).json({ message: "ChatMessage not found" });
        }

        ChatMessage.findByIdAndDelete(chatmessageId).then((result) => {
            if(!result){
                return res.status(404).json({ message: "Chat Message not found" });
            }
            res.status(200).json({ message: "Message deleted", request: chatMessage });
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ message: "Failed to delete chat message" });
        });
    }
}