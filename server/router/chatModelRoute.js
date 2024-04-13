const express = require("express");
const chatmodelController = require("../controller/chatModelController");
const router = express.Router();


router.get("/get-all-chat-models", chatmodelController.GETAllChatModels)
router.post("/get-chat-model", chatmodelController.GETChatModel)

module.exports = router;