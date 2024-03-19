const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstName: {
        type : String,
        required : true
    },
    lastName: {
        type : String,
        required : true
    },
    gender: {
        type : String,
        enum : ["male", "female", "other"]
    },
    email: {
        type : String,
        required : true,
        match : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password: {
        type : String,
        required : true,
        match : /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{":;?/.,<>]).{6,}$/ //minimum six letter, with atleast one capital letter, one special character and one integer
    },
    dialCode: {
        type : String,
        required : true
    },
    phoneNumber: {
        type : String,
        required : true
    },
    dateofbirth: {
        type : String,
        required : true
    },
    friends: [{
        type: mongoose.Schema.Types.Mixed,
        ref: 'Users'
    }]
})

const User = mongoose.model("User", userSchema);
module.exports = User;