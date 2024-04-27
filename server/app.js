require("dotenv").config
const WebSocket = require('ws');
const webRTCactions = require('./webRTC/actions.js');

const express = require('express');
const cookieParser = require("cookie-parser");
const app = express();
const port = 5000

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
const http = require("http");
const createSocketServer = require("./middleware/socket");
const server = http.createServer(app);
const io = createSocketServer(server);
const webrtcWS = new WebSocket.Server({ server, path: '/webrtc' });

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

//creates a map of socketId and userId
const userSocketMap = new Map();
io.on("connection", (socket) => {
    socket.emit("me", socket.id)
    console.log(`A user connected ${socket.id}`);
    socket.on("disconnect", ()=>{
        console.log(`A user disconnected ${socket.id}`);
        socket.broadcast.emit("callEnded")
        userSocketMap.delete(socket.id);
    })

    socket.on("login", (data)=>{
        console.log(`The user with userId : ${data.userId} and assigned socketId : ${socket.id} has logged in`);
        userSocketMap.set(data.userId, socket.id);
    })

    socket.on("logout", ()=>{
    console.log(`The user ${socket.id} has logged out`);
    })

    socket.on("joinRoom", (room)=>{
    socket.join(room)
    console.log(`User with ID : ${room.userId} having socketId : ${socket.id} joined room : ${room.chatModelId}`);
    })
    
    socket.on("sendMessage", (data) => {
        socket.to(data.room).emit("receiveMessage", data);
        console.log(data);
    });


	socket.on("callUser", (data) => {
        const { userToCall, signalData, from, name } = data;
        //finds if the sent id of user as userToCall is present in the map if so and extracts the socketId
        const friendSocketId = userSocketMap.get(userToCall);
        if(friendSocketId){
            console.log(friendSocketId);
            console.log("callUser listeneer is being called");
            io.to(friendSocketId).emit("callUser", { from: from, signalData : signalData, name: name })
        }
	})

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	})

});

webrtcWS.on("connection", (ws) => {
    ws.on("message", (message) => {
      const data = JSON.parse(message);
      switch (data.type) {
        case "joinRoom":
            webRTCactions.handleJoinRoom(ws, data, webrtcWS);
          break;
        case "createRoom":
            webRTCactions.handleCreateRoom(ws, data);
          break;
        case "offer":
            webRTCactions.handleOffer(ws, data);
          break;
        case "answer":
            webRTCactions.handleAnswer(ws, data);
          break;
        case "iceCandidate":
            webRTCactions.handleIceCandidate(ws, data);
          break;
        case "disconnect":
            webRTCactions.handleDisconnect(ws);
          break;
        case "clientList":
            webRTCactions.handleClientList(ws);
          break;
        default:
          console.log(message);
      }
    });
    ws.on("close", (code, reason) => {
      console.log("close initiated");
      try {
        webRTCactions.handleDisconnect(ws);
      } catch (err) {
        console.log(err);
      }
    });
  });


server.listen(port, () => console.log(`Example app listening on port ${port}!`))
