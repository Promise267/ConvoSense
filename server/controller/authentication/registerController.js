const User = require("../../model/user");
const jwt = require("jsonwebtoken");
module.exports = {
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
                    res.json({message : "User added Successfully", redirect : "/home"})
                }).catch((err) => {
                    res.send(err);
                    console.log(err);
                });
            }
        }).catch((err) => {
            res.json({message : "error"});
            console.log(err);
        });
    }
}