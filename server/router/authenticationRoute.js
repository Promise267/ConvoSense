const express = require("express");
const loginController = require("../controller/authentication/loginController")
const registerController = require("../controller/authentication/registerController")

const router = express.Router();

router.post("/auth/findUser", loginController.POST)
router.post("/auth/postUser", registerController.POST)

module.exports = router