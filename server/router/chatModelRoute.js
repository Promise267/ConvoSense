const express = require("express");
const chatmodelController = require("../controller/chatModelController");
const router = express.Router();


router.get("/get-all-chat-models", chatmodelController.GETAllChatModels)

module.exports = router;