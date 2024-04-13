const express = require("express");
const chatmessageController = require("../controller/chatmessageController");
const router = express.Router();

router.post("/send-chat-message", chatmessageController.POSTChatMessage);
router.post("/get-chat-message", chatmessageController.GETChatMessage);

module.exports = router

