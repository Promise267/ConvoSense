const jwt = require("jsonwebtoken")
const User = require("../model/user")

const authMiddleware = async(req, res, next) =>{
    const token = req.header("Authorization");
    if(!token){
        res.status(401).json({message : "Unauthorized, Token not provided"})
    }
    //console.log(token);
    // Assuming token is in the format "Bearer <jwtToken>, Removing the "Bearer" prefix"
    const jwtToken = token.replace("Bearer", "").trim();
    
    try{
        const isVerified = jwt.verify(jwtToken, process.env.TOKEN_SECRET);
        //console.log("The phoneNumber" + isVerified.phoneNumber);
        const userData = await User.findOne({phoneNumber : isVerified.phoneNumber})
        //console.log("I am User Data" + userData);

        req.phoneNumber = userData;
        req.token = token
        next();
    }
    catch(err){
        return res.status(401).json({ message: "Unauthorized. Invalid token.", redirect: "/login" });
    }
}

module.exports = authMiddleware