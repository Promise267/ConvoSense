require("dotenv").config()
const jwt = require("jsonwebtoken");
let realToken = "";

const generateToken = async (req,res) => {
    const {phoneNumber} = req.body
    if(phoneNumber){
        realToken = jwt.sign({
            phoneNumber : phoneNumber},
            process.env.TOKEN_SECRET,
            {expiresIn : '1h'});
            
        return res.cookie("accessToken", realToken, {
            httpsOnly : true,
            path : "/home"
            //secure : process.env.TOKEN_SECRET
        }).status(200).json({accessToken : realToken, phoneNumber : phoneNumber, redirect : "/home"})
    }
    else{
        return res.status(404).json({message : "No PhoneNumber Provided"});
    }
}

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken
    const phoneNumber = req.body.phoneNumber
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        if(decodedToken) {
            console.log(`Token = ${token}`);
            console.log(phoneNumber);
            return res.status(200).json({isValid: true, message : "User's token still exists"});
        }
    } catch (error) {
        return res.status(403).json({isValid: false, message : "Please Re Login", redirect: '/login', expectedToken : realToken, actualToken : token});
    }
}

module.exports = {
    verifyToken,
    generateToken
}