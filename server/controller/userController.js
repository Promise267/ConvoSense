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
}