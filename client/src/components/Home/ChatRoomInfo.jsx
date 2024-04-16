import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faImage, faVideo, faPhone } from '@fortawesome/free-solid-svg-icons'
import {toggleCamera} from "../../redux/cameraStatus/cameraStatusSlice"
import Peer from "simple-peer"
import io from "socket.io-client"

export default function ChatRoomInfo({chatModelId,firstName,lastName,dialCode,phoneNumber,socket}) {

  const dispatch = useDispatch();
  const [myStream, setMyStream] = useState(null);
  const myVideoRef = useRef();

  useEffect(() => {

      if (myStream && myVideoRef.current) { // Check if myVideoRef.current exists
          myVideoRef.current.srcObject = myStream;
      }
  }, [myStream]);

  const handleCallPerson = () => {
    if (myStream) {
          // Stop the tracks in the stream
          myStream.getTracks().forEach(track => track.stop());
          // Set myStream to null to indicate that the camera is off
          setMyStream(null);
          // Dispatch the action to toggle the camera
          dispatch(toggleCamera());
      } else {
          // Turn on the camera
          navigator.mediaDevices.getUserMedia({ video: true, audio: true })
              .then((stream) => {
                  setMyStream(stream);
                  dispatch(toggleCamera());
                  if (socket) {
                      const peer = new Peer({ initiator: true, stream: myStream });

                      peer.on('signal', (data) => {
                          socket.emit('callUser', { userToCall: chatModelId, signalData: data });
                      });

                      socket.on('callAccepted', (signal) => {
                          peer.signal(signal);
                      });

                      peer.on('stream', (stream) => {
                          const video = document.createElement('video');
                          video.srcObject = stream;
                          video.play();
                          document.body.appendChild(video);
                      });
                  }
              })
              .catch((error) => {
                  console.error('Error accessing media devices:', error);
              });
      }
  };



  return (
    <>
    <div className="flex justify-between items-center m-4">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row justify-center items-center space-x-5 first">
          <FontAwesomeIcon icon={faImage} size='2xl' />
          <p className="font-medium">{firstName} {lastName}</p>
        </div>
        <div>
			<p className="text-xs font-medium">{dialCode} {phoneNumber}</p>
          <p className="text-xs">Active Status</p>
        </div>
      </div>

      <div className="flex flex-row space-x-4">
        {/* //<FontAwesomeIcon icon={faPhone} size='2xl' /> */}
		<button onClick={handleCallPerson}>
        <FontAwesomeIcon icon={faVideo} size='2xl' />
		</button>
      </div>
    </div>
    </>
  )
}
