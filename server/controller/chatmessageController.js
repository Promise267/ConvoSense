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
    }
}