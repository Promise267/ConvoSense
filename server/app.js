require("dotenv").config
const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const port = 5000
const http = require("http")
const createSocketServer = require("./middleware/socket");
const server = http.createServer(app);
const io = createSocketServer(server);

const userRouter = require("./router/userRoute")
const smsVerificationRouter = require("./router/codeVerificationRoute");
const authenticationRouter = require("./router/authenticationRoute");
const tokenVerificationRouter = require("./router/tokenVerificationRoute");
const chatrequestRouter = require("./router/chatrequestRoute");
const chatModelRouter = require("./router/chatModelRoute");
const chatMessageRouter = require("./router/chatmessageRoute");

const cors = require("cors")
const db = require("./middleware/db");
const bodyParser = require("body-parser");

app.use(
    cors({
    origin : [`${process.env.FRONTEND_URI}`],
    credentials : true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.use("/", userRouter);
app.use("/", smsVerificationRouter);
app.use("/", authenticationRouter);
app.use("/", tokenVerificationRouter);
app.use("/", chatrequestRouter);
app.use("/", chatModelRouter)
app.use("/", chatMessageRouter);


io.on("connection", (socket) => {
	socket.emit("me", socket.id)

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
	})

	socket.on("callUser", (data) => {
		io.to(data.userToCall).emit("callUser", { signal: data.signalData, from: data.from, name: data.name })
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})
})


server.listen(port, () => console.log(`Example app listening on port ${port}!`))