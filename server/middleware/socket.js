const { Server } = require("socket.io");

const createSocketServer = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000/home/",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true // If you need to send cookies with the request
    }
  });
  return io;
};

module.exports = createSocketServer
