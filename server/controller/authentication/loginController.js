const User = require("../../model/user");
const hashPassword = require("../../services/hashPassword")
module.exports = {
    POST : (req, res) => {
        const{dialCode, phoneNumber, password} = req.body
        const hashedPassword = hashPassword(password)
        User.findOne({dialCode : dialCode, phoneNumber : phoneNumber, password : hashedPassword}).then((result) => {
            if(result){
                res.json({message : "User Verified", user: result, redirect : "/home"})
            }
            else{
                res.status(404).json({message : "User does not exist"})
            }
        }).catch((err) => {
            res.send(err);
        });
    }
}