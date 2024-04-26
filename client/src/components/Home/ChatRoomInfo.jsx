import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faVideo, faPhone } from "@fortawesome/free-solid-svg-icons";
import Peer from "simple-peer";
import Camera from "./Camera";
import ReactPlayer from "react-player";
import * as webrtc from "../WebRTC/actions";
import { configuration, setLocalStream, socketWebRTC } from "../WebRTC/globals";
import { X } from "lucide-react";
import {
  remoteStream,
  setRemoteStream,
  videoPremission,
  setVideoPremission,
  audioPremission,
  setAudioPremission,
  emptyRemoteStream,
  setSocket,
  peerConnection,
  setPeerConnection,
  
} from "../WebRTC/globals";

export default function ChatRoomInfo({
  chatModelId,
  friendId,
  firstName,
  lastName,
  dialCode,
  phoneNumber,
  socket,
}) {
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const [me, setMe] = useState("");
  const [meSet, setMeSet] = useState(false);
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const getCredential = useSelector(
    (state) => state.persistReducedReducer.credential
  );
  const getCameraStatus = useSelector((state) => state.cameraStatus);

  // WEBRTC

  const connectionInitiator = async (socketWebRTC) => {

    setPeerConnection(new RTCPeerConnection(configuration))
    socketWebRTC.onmessage = async (event) => {
      const data = await JSON.parse(event.data);

      if (data.type === "offer") {
        if (data.negotiation) {
          const pc = peerConnection;
          await webrtc.handleNegotiationNeededAnswer(data, socketWebRTC, pc);
        } else {
          const pc = peerConnection;

          await webrtc.handleRecieveOffer(data, pc, socketWebRTC, stream);
        }
      } else if (data.type === "answer") {
        const pc = peerConnection;
        await webrtc.handleRecieveAnswer(data, data.senderID, pc);
      } else if (data.type === "candidate") {
        const pc = peerConnection;
        await webrtc.handleRecieveIceCandidate(data, pc);
      } else if (data.type === "clientList") {
      } else if (data.type === "notifyJoinRoom") {
        if (data.userId !== me) {
          await webrtc.sendOffer(data.userId, socketWebRTC, stream);
        }

      } else {
      }
    };

  };

  const startCallCaller = async (roomId) => {

    socketWebRTC.send(
      JSON.stringify({
        type: "joinRoom",
        roomId: roomId,   //roomID is the "me" of the caller
        userId: me,
      })
    );
  };

  //------------

  const accessCamera = async () => {
    await navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        setLocalStream(stream);

        if (myVideo.current) {
          myVideo.current.srcObject = streamLocal;
        }
      });
  };

  const OnClose = () => {
    if(peerConnection && peerConnection.signalingState !== "closed"){
      peerConnection.close();
    }
    
    emptyRemoteStream();

    setCallAccepted(false);
    setCallEnded(true);
    setReceivingCall(false);

    setPeerConnection(null);

    emptyRemoteStream();
  };

  useEffect(() => {
    setCallEnded(false);
    setSocket(connectionInitiator);
    socket.on("me", (id) => {
      setMe(id);
    });

    socket.on("callUser", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });

    return () => {
      const tracks = (
        myVideo.current?.srcObject
      )?.getTracks();
      tracks && tracks.forEach((track) => track.stop());
      OnClose();
    };
  }, []);

  const callUser = async () => {
    await accessCamera();

    socket.emit("callUser", {
      userToCall: friendId,
      signalData: "data",
      from: me,
      name: getCredential.firstName,
    });

    socket.on("callAccepted", async (signal) => {
      console.log("Call accepted signal received:", signal);
      setCallAccepted(true);
      await startCallCaller(me);
    });
  };

  const answerCall = async () => {
    await accessCamera();
    setCallAccepted(true);
    
    socket.emit("answerCall", { signal: { id: me }, to: caller });

    await startCallCaller(caller);
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  return (
    <>
      <div className="flex justify-between items-center m-4">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-row justify-center items-center space-x-5 first">
            <FontAwesomeIcon icon={faImage} size="2xl" />
            <p className="font-medium">
              {firstName} {lastName}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium">
              {dialCode} {phoneNumber}
            </p>
            <p className="text-xs">Active Status</p>
          </div>
        </div>

        <div className="flex flex-row items-center space-x-4">
          <div className="col">
            {!callAccepted ? (
              <button onClick={callUser}>
                <FontAwesomeIcon icon={faVideo} size="2xl" />
              </button>
            ) : (
              <button
                onClick={() => {
                  OnClose();
                  window.location.reload();
                }}
              >
                <X size={24} /> {/*Cross Icon And Action */}
              </button>
            )}
          </div>
          <div className="col">
          
            {remoteStream.length > 0 &&
              remoteStream.map((stream) => <Camera stream={stream} />)}
          </div>
        </div>
        <div>
          {stream && <Camera stream={stream} />}
          {receivingCall && !callAccepted ? (
            <div className="caller">
              <h1>{name} is calling...</h1>
              <button className="bg-purple-400" onClick={() => {
                answerCall();
                answerCall();  //incase camera initialisation is failed
              }}>
                Answer
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
