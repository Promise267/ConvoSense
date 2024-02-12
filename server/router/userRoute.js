const express = require("express");
const userController = require("../controller/userController")
const router = express.Router();

router.get("/user/getUser", userController.GET)
router.post("/user/postUser", userController.POST)
//router.delete("/user/deleteUser", userController.DELETE)
//router.patch("/user/patchUser", userController.PATCH);

module.exports = router