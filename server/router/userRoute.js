const express = require("express");
const userController = require("../controller/userController")
const router = express.Router();

router.get("/user/getUser", userController.GET)
router.post("/user/findUser", userController.POST)

module.exports = router