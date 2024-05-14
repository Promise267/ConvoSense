//stores data of users
const User = require("../model/user");

module.exports = {
    GET : (req, res) => {
        User.find().then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        });
    },

    POST : (req,res) => {
        const {dialCode, phoneNumber} = req.body
        User.findOne({dialCode : dialCode, phoneNumber : phoneNumber}).then((result) => {
            if(result){
                res.status(409).json({message : "User already exists"})
            }
            else{
                res.json({message : "User doesnot exist"})
            }
        }).catch((err) => {
            res.send(err);
        });

    }
}