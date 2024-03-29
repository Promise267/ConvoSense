const express = require("express");
const chatrequestController = require("../controller/chatrequestController");
const router = express.Router();

router.get("/get-all-chat-requests", chatrequestController.GETAllChatRequests)
router.post("/send-chat-request", chatrequestController.POSTChatRequest)
router.post("/get-chat-request", chatrequestController.GETChatRequest)
router.post("/get-sent-chat-request", chatrequestController.GETSentChatRequest)
router.patch("/approve-chat-request", chatrequestController.PATCHApproveRequest)
router.delete("/delete-chat-request", chatrequestController.DELETEChatRequest)
router.delete("/delete-sent-chat-request", chatrequestController.DELETESentChatRequest)

module.exports = router;
