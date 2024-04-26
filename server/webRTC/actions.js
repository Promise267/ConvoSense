const WebSocket = require('ws');

var rooms ={
    // roomId: [{id: clientId, userId: userId}]
}
var wss;

const handleJoinRoom = (ws, data ,wssd) => {
  const { roomId, userId } = data;

  
  if (!rooms[roomId]) {
    rooms[roomId] = [];
  }
  ws.roomId = roomId;
  ws.id = userId;

  wss = wssd;

  rooms[roomId].push({ id: ws.id });

  const clientsArray = Array.from(wss.clients);
  rooms[ws.roomId].forEach((user) => {
    const client = clientsArray.find((client) => client.id === user.id);

    if (client && client?.id !== data.userId && client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "notifyJoinRoom",
          userId: ws.id,
        })
      );
    }
  });

};

const handleOffer = (ws, data) => {
  const clientsArray = Array.from(wss.clients);
    const client = clientsArray.find((client) => client.id === data.target);
    if (client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "offer",
          payloadOffer: data.offer,
          senderID: ws.id, 
          negotiation: data.negotiation,
        })
      );
    }else{
        console.log("ERROR: CLIENT NOT FOUND");
    
    }
  
};

const handleAnswer = (ws, data) => {
  const clientsArray = Array.from(wss.clients);
    const client = clientsArray.find((client) => client.id === data.target);
    if (client.id === data.target && client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "answer",
          answer: data.answer,
          senderID: ws.id,
          negotiation: data.negotiation,
        })
      );
    }
};

const handleIceCandidate = (ws, data) => {
  const clientsArray = Array.from(wss.clients);

    const client = clientsArray.find((client) => client.id === data.target);
    if (client.id === data.target && client.readyState === WebSocket.OPEN) {
      client.send(
        JSON.stringify({
          type: "candidate",
          candidate: data.candidate,
          senderID: ws.id,
        })
      );
    }
};


const handleDisconnect = (ws) => {
  roomid = ws.roomId;

  if (rooms[roomid]) {
    const index = rooms[roomid].findIndex((user) => user.id === ws.id);
    if (index > -1) {
      rooms[roomid].splice(index, 1);
    }
  }
};


module.exports = {handleJoinRoom, handleOffer, handleAnswer, handleIceCandidate, handleDisconnect};