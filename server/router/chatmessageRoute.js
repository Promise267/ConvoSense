const express = require("express");
const chatmessageController = require("../controller/chatmessageController");
const router = express.Router();

router.post("/send-message", chatmessageController.POST);
router.get("/get-message", chatmessageController.GET);

module.exports = router

