const express = require("express");
const userController = require("../controller/userController")
const router = express.Router();

router.get("/user/getUser", userController.GET)

module.exports = router