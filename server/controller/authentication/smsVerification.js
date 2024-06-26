require("dotenv").config()
const User = require("../../model/user");
const accountSid = process.env.ACCOUNT_SID
const authToken = process.env.AUTH_TOKEN
const client = require('twilio')(accountSid, authToken);
const verificationCode = require("../../services/codeGenerator");

const sendVerificationCode = async(req, res)=>{
    const {dialCode, phoneNumber} = req.body
    const recipientphoneNumber = dialCode + phoneNumber

    client.messages.create({
        from: process.env.SENDER_PHONENUMBER,
        to: recipientphoneNumber,
        body : `Your Verification OTP is ${verificationCode}`
    }).then((result) => {
        console.log(result.sid)
        res.json({message : `Verfication Code Sent`, code : `${verificationCode}`});
    }).catch((err) => {
        console.log(err);
    });
}

const verifyCode = async(req, res) => {
    const {code, phoneNumber} = req.body

    if(code !== "", phoneNumber !== ""){
        if (parseInt(code) === verificationCode) {
            return res.status(200).json({ message: 'Verification successful'});
        } else {
            return res.status(401).json({ message: 'Verification failed. Please try again.', actualCode : `${verificationCode}`, enteredCode : `${code}` });
        }
    }
    else{
        return res.status(403).json({message : "PhoneNumber or Code is missing"});
    }

}

module.exports = {
    sendVerificationCode,
    verifyCode
}