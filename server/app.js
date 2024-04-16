require("dotenv").config
const express = require('express');
const cookieParser = require("cookie-parser");
const { v4: uuidv4 } = require('uuid');
const { ExpressPeerServer } = require('peer');
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

// Create a PeerServer for handling WebRTC connections
const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/peerjs', // Path for PeerJS server
});
app.use('/peerjs', peerServer);

const peers = {};

io.on("connection", (socket) => {
    console.log(`A user connected ${socket.id}`);
    socket.on("disconnect", ()=>{
        console.log(`A user disconnected ${socket.id}`);
        // Remove the peer when a user disconnects
        delete peers[socket.id];
    })

    socket.on("login", ()=>{
    console.log(`The user ${socket.id} has logged in`);
    })

    socket.on("logout", ()=>{
    console.log(`The user ${socket.id} has logged out`);
    })

    socket.on("joinRoom", (room)=>{
    socket.join(room)
    console.log(`User with ID : ${socket.id} joined room : ${room}`);
    })
    
    socket.on("sendMessage", (data) => {
        socket.to(data.room).emit("receiveMessage", data);
        console.log(data);
    });

    // Handle WebRTC signaling
    socket.on('callUser', ({ userToCall, signalData }) => {
        io.to(userToCall).emit('callUser', { signal: signalData, from: socket.id });
    });

    socket.on('answerCall', (data) => {
        io.to(data.to).emit('callAccepted', data.signal);
    });

    socket.on('iceCandidate', (data) => {
        io.to(data.to).emit('iceCandidate', { candidate: data.candidate, from: data.from });
    });

    // Add the socket to the list of peers
    peers[socket.id] = socket;

    // Broadcast video stream to other peers in the room
    socket.on('stream', (stream, room) => {
        socket.to(room).emit('stream', stream);
    });
});

peerServer.on('connection', (client) => {
    console.log(`Peer connected: ${client.getId()}`);

    // Add the PeerJS client to the list of peers
    peers[client.getId()] = client;

    client.on('disconnect', () => {
        console.log(`Peer disconnected: ${client.getId()}`);
        // Remove the PeerJS client when it disconnects
        delete peers[client.getId()];
    });
});


server.listen(port, () => console.log(`Example app listening on port ${port}!`))
