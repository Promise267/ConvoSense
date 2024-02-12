//stores data of users
const User = require("../model/user");
const jwt = require("jsonwebtoken");

module.exports = {
    GET : (req, res) => {
        User.find().then((result) => {
            res.send(result)
        }).catch((err) => {
            res.send(err)
        });
    },

    POST:(req, res)=>{
        const{firstName, lastName, gender, email, password, dialCode, phoneNumber, dateofbirth} = req.body

        const newUser = new User({
            firstName,
            lastName,
            gender,
            email,
            password,
            dialCode,
            phoneNumber,
            dateofbirth
        })

        User.findOne({phoneNumber:phoneNumber}).then((existingUser) => {
            if(existingUser){
                return res.status(409).json({error : `User with this phoneNumber ${phoneNumber} already exists`})
            }
            else{
                newUser.save().then(() => {
                    const accessToken = jwt.sign(
                        {username : newUser.username},
                        process.env.TOKEN_SECRET,
                        {expiresIn : "1h"})
                        res.json({message : "User added Successfully", accessToken : accessToken})
                }).catch((err) => {
                    res.send(err);
                    console.log(err);
                });
            }
        }).catch((err) => {
            res.json({message : "error"});
        });

    }
}