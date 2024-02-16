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

const verifyToken = (req, res) =>{
    try {
        const userData = req.user;
        return res.status(200).json({ userData, redirect: "/home" });
      } catch (error) {
        console.log(`error from the user route ${error}`);
      }
}


module.exports = {
    generateToken,
    verifyToken
}