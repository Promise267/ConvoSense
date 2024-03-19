require("dotenv").config
const mongoose = require("mongoose")
const db = mongoose.connect("mongodb://127.0.0.1:27017/ConvoSense")
//const db = mongoose.connect(`${process.env.MONGO_URI}`)

module.exports = db