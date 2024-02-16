require("dotenv").config
const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const port = 5000

const userRouter = require("./router/userRoute")
const smsVerificationRouter = require("./router/codeVerificationRoute");
const authenticationRouter = require("./router/authenticationRoute");
const tokenVerificationRouter = require("./router/tokenVerificationRoute");

const cors = require("cors")
const db = require("./middleware/db");
const bodyParser = require("body-parser");

app.use(
    cors({
    origin : ["http://localhost:3000"],
    credentials : true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use("/", userRouter);
app.use("/", smsVerificationRouter);
app.use("/", authenticationRouter);
app.use("/", tokenVerificationRouter);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))