const User = require("../../model/user");
module.exports = {
    POST : (req, res) => {
        const{dialCode, phoneNumber, password} = req.body
        User.findOne({dialCode : dialCode, phoneNumber : phoneNumber, password : password}).then((result) => {
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