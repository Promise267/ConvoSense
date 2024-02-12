require("dotenv").config
const express = require('express');
const app = express();
const port = 5000

const userRouter = require("./router/userRoute")
const verificationRouter = require("./router/codeVerification");

const cors = require("cors")
const db = require("./middleware/db");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use("/", userRouter);
app.use("/", verificationRouter);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))