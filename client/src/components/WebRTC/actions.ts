
import {
  remoteStream,
  setRemoteStream,
  videoPremission,
  setVideoPremission,
  audioPremission,
  setAudioPremission,
  emptyRemoteStream,
  setPeerConnection,
  peerConnection,
  localStream,
  socketWebRTC
} from "./globals";



const clientStreamMap = new Map<string, MediaStream>();


const configuration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },

    { urls: "stun:global.stun.twilio.com:3478" },
  ],
};

export const sendOffer = async (
  client: string,
  socket: WebSocket,
  stream: MediaStream,
) => {
  const pcStore: RTCPeerConnection = peerConnection;
  await trackEventSetup(pcStore, client, socket);
  

  const pc = peerConnection;

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);
  socket.send(
    JSON.stringify({
      type: "offer",
      offer: offer,
      target: client,
    })
  );

  setPeerConnection(pc);
  return pc;
};

export const handleNegotiationNeededOffer = async (
  client: string,
  socket: WebSocket,
  pc: RTCPeerConnection
) => {
  if (pc) {
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    socket.send(
      JSON.stringify({
        type: "offer",
        offer: offer,
        target: client,
        negotiation: true,
      })
    );

  }
};

export const handleNegotiationNeededAnswer = async (
  data: any,
  socket: WebSocket,
  pc: RTCPeerConnection
) => {
  try {

    if (!pc) return; // Return

    const remoteDescription = data.payloadOffer
      ? new RTCSessionDescription(data.payloadOffer)
      : null;
    if (!remoteDescription) return; // Return

    await pc.setRemoteDescription(remoteDescription);
    const answer = await pc.createAnswer();

    await pc.setLocalDescription(answer);

    socket.send(
      JSON.stringify({
        type: "answer",
        answer: answer,
        target: data.senderID,
        negotiation: true,
      })
    );

  

    setPeerConnection(pc);
  } catch (error) {
    console.log("error", error);
  }
};

export const sendAnswer = async (
  data: any,
  socket: WebSocket,
  stream: MediaStream,
  pc2: RTCPeerConnection
) => {

  const pcStore: RTCPeerConnection = pc2;
  await trackEventSetup(pcStore, data.senderID, socket);
  eventlistenerSetup(pcStore, data.senderID, socket);

  negotiationEventlistenerSetup(pcStore, data.senderID, socket);
  const pc = peerConnection;

  if (!pc) return; // Return

  const remoteDescription = data.payloadOffer
    ? new RTCSessionDescription(data.payloadOffer)
    : null;
  if (!remoteDescription) return; // Return

  await pc.setRemoteDescription(remoteDescription);
  const answer = await pc.createAnswer();

  await pc.setLocalDescription(answer);

  socket.send(
    JSON.stringify({
      type: "answer",
      answer: answer,
      target: data.senderID,
    })
  );



  setPeerConnection(pc);
};

export const handleIceCandidate = (
  event: any,
  clientId: any,
  pc: RTCPeerConnection,
  socket: WebSocket
) => {
  

  

  if (event.candidate && pc && pc.remoteDescription) {
    socket.send(
      JSON.stringify({
        type: "iceCandidate",
        candidate: event.candidate,
        target: clientId,
      })
    );

  }

  setPeerConnection(pc);
};

export const handleRecieveIceCandidate = async (
  data: any,
  pc: RTCPeerConnection
) => {
  if (pc && pc.remoteDescription) {
    try {
      const candidate = new RTCIceCandidate(data.candidate);
      await pc.addIceCandidate(candidate);
    } catch (err) {
      console.log("error", err);
    }
  }
  setPeerConnection(pc);
};

export const handleRecieveOffer = async (
  data: any,
  pc: RTCPeerConnection,
  socket: WebSocket,
  stream: MediaStream
) => {
  if (pc) {
    await sendAnswer(data, socket, stream , pc);
  }
};

export const handleRecieveAnswer = async (
  data: any,
  client: string,
  pc: RTCPeerConnection
) => {
  try {
    if (data.answer) {
      eventlistenerSetup(pc, client, socketWebRTC);

      const updatePC = peerConnection;
      if (updatePC) {

        await updatePC.setRemoteDescription(new RTCSessionDescription(data.answer)); 

        

        setPeerConnection(updatePC);
      }
    }
    
  } catch (error) {
    console.log("error", error);
  }
};

export const addTrackAddon = async (
  stream: MediaStream,
  pc: RTCPeerConnection,
  client: string,
  socket: WebSocket
) => {
  if (stream) {
    if (pc) {
      try {
        negotiationEventlistenerSetup(pc, client, socket);
        stream.getTracks().forEach((track) => pc.addTrack(track, stream));
        
      } catch (err) {
        console.log("error", err);
      }
    }
  }

  return pc;
};

export const handleTrackEvent = (event: any, clientID: string) => {
  const track = event.track;

  var mediaStream = clientStreamMap.get(clientID) || new MediaStream();

  if (track.kind === "audio") {
    mediaStream = new MediaStream();
  }
  if (track.kind === "video") {
    mediaStream.addTrack(track);
  }
  if (track.kind === "audio") {
    mediaStream.addTrack(track);
  }

  clientStreamMap.set(clientID, mediaStream);


  emptyRemoteStream();

  setRemoteStream(mediaStream);


 
};



export const removeAllTracksFromStream = (stream: MediaStream) => {
  stream.getTracks().forEach((track) => {
    stream.removeTrack(track);
  });
};


export const manageStreamControls = (
  changeNeeded: string,
  streamLocal: MediaStream
) => {
  const localStream = streamLocal;
  const audioTrack = localStream.getAudioTracks()[0]; 
  const videoTrack = localStream.getVideoTracks()[0]; 

  if (audioTrack && !audioPremission && changeNeeded === "audio") {
    audioTrack.enabled = true;
    setAudioPremission(true);
  }
  if (videoTrack && !videoPremission && changeNeeded === "video") {
    videoTrack.enabled = true;
    setVideoPremission(true);
  }
  if (audioTrack && audioPremission && changeNeeded === "audio") {
    audioTrack.enabled = false;
    setAudioPremission(false);
  }

  if (videoTrack && videoPremission && changeNeeded === "video") {
    videoTrack.enabled = false;
    setVideoPremission(false);
  }
};

export const eventlistenerSetup = (
  pc: RTCPeerConnection,
  clientID: string,
  socket: WebSocket
) => {
  pc.onicecandidate = (event) =>
    handleIceCandidate(event, clientID, pc, socket);

  pc.oniceconnectionstatechange = () => {
    if (pc.iceConnectionState === "connected") {
    } else if (pc.iceConnectionState === "disconnected") {


      clientStreamMap.delete(clientID);

      emptyRemoteStream();
      
      Array.from(clientStreamMap.values()).map((stream: MediaStream) =>
        setRemoteStream(stream)
      );
    }
  };


  setPeerConnection(pc);
};

export const negotiationEventlistenerSetup = (
  pc: RTCPeerConnection,
  clientID: string,
  socket: WebSocket
) => {
  pc.onnegotiationneeded = async () => {

    await handleNegotiationNeededOffer(clientID, socket, pc);
  };

  setPeerConnection(pc);
};
export const trackEventSetup = async (
  pc: RTCPeerConnection,
  clientID: string,
    socket: WebSocket
) => {
  try {
    if (localStream) {
      localStream
        .getTracks()
        .forEach((track) => pc.addTrack(track, localStream));

      
    }
    setPeerConnection(pc);
  } catch (err) {
    console.log("error", err);
  }

  const updatePC = peerConnection

  updatePC.ontrack = (event) => {
    handleTrackEvent(event, clientID);
  };

  setPeerConnection(updatePC);
  
};

export const handleDisconnect = (
  socket: WebSocket,
  clientID: string,
  pc: RTCPeerConnection
) => {


  if (socket.readyState === WebSocket.OPEN) {
    socket.close();
  }

  if (pc) {
    pc.close();
  }

};
