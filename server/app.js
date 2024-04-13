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


io.on('connection', (socket) => {
    console.log('A user connected', socket.id);

    // Send a message to the frontend
    socket.emit('connected', 'You are connected to the server');


    socket.on("joinChat", (chat) => {
        socket.join(chat)
        console.log(`User with ID : ${socket.id} joined room : ${chat}`);
    })

    socket.on("sendMessage", (messageData)=>{
        socket.to(messageData.chatModelId).emit("receiverMessage", messageData)
        console.log(messageData);
    })

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


server.listen(port, () => console.log(`Example app listening on port ${port}!`))