export var socketWebRTC: WebSocket;

export var socketReadyState: boolean = false;
export const removeSocket = () => {
  socketWebRTC?.close();
};

export const setSocket = (connectionInitiator: {
  (socketWebRTC: WebSocket): Promise<void>;
  (): void;
}) => {
  socketWebRTC = new WebSocket(`ws://localhost:5000/webrtc`); // URL of Websocket server for WebRTC

  socketWebRTC.onopen = () => {
    console.log("WebRTC WebSocket connection established.");
    socketReadyState = true;

    connectionInitiator(socketWebRTC);
  };

  return socketWebRTC;
};

export const configuration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },

    { urls: "stun:global.stun.twilio.com:3478" },
  ],
};

export var peerConnection: RTCPeerConnection;

export const setPeerConnection = (pc: RTCPeerConnection) => {
  peerConnection = pc;
};

export const closePeerConnection = () => {
  peerConnection.close();
};

export const makePeerConnection = async () => {
  setPeerConnection(new RTCPeerConnection(configuration));
};

export var localStream: MediaStream = new MediaStream();

export const setLocalStream = (stream: MediaStream) => {
  localStream = stream;
};

export var remoteStream: MediaStream[] = [];

export const setRemoteStream = (stream: MediaStream) => {
  remoteStream.push(stream);
};

export const emptyRemoteStream = () => {
  remoteStream = [];
};

export var videoPremission = true;

export const setVideoPremission = (permission: boolean) => {
  videoPremission = permission;
};

export var audioPremission = true;

export const setAudioPremission = (permission: boolean) => {
  audioPremission = permission;
};
