const express = require("express");
const verification = require("../middleware/verification");
const router = express.Router();

router.post("/sendVerificationCode", verification.sendVerificationCode)
router.post("/verifyCode", verification.verifyCode)

module.exports = router;
