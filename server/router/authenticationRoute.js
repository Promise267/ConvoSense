const express = require("express");
const loginController = require("../controller/authentication/loginController")
const registerController = require("../controller/authentication/registerController")

const router = express.Router();

router.post("/auth/findUser", loginController.POST)
router.post("/auth/postUser", registerController.POST)
//router.delete("/user/deleteUser", userController.DELETE)
//router.patch("/user/patchUser", userController.PATCH);

module.exports = router