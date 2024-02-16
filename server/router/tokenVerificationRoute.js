const express = require("express")
const router = express.Router();
const authMiddleware = require("../middleware/auth")
const tokenVerification = require("../middleware/token/tokenVerification")

router.post("/sendToken", tokenVerification.generateToken);
router.get("/verifyToken", authMiddleware, tokenVerification.verifyToken);

module.exports = router;