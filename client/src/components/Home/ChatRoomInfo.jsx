import React, {useState, useRef, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faImage, faVideo, faPhone } from '@fortawesome/free-solid-svg-icons'
import {toggleCamera} from "../../redux/cameraStatus/cameraStatusSlice"
import Peer from "simple-peer"
import io from "socket.io-client"

export default function ChatRoomInfo({chatModelId,firstName,lastName,dialCode,phoneNumber}) {

  const socket = io.connect("http://localhost:5000")
  const [ me, setMe ] = useState("")
  const [ stream, setStream ] = useState()
  const [ receivingCall, setReceivingCall ] = useState(false)
  const [ caller, setCaller ] = useState("")
  const [ callerSignal, setCallerSignal ] = useState()
  const [ callAccepted, setCallAccepted ] = useState(false)
  const [ idToCall, setIdToCall ] = useState("")
  const [ callEnded, setCallEnded] = useState(false)
  const [ name, setName ] = useState("")
  const connectionRef= useRef()
  const dispatch = useDispatch();


  useEffect(() => {
	socket.on("me", (id) => {
			setMe(id)
		})

	socket.on("callUser", (data) => {
		setReceivingCall(true)
		setCaller(data.from)
		setName(data.name)
		setCallerSignal(data.signal)
	})
	}, [])

	const callUser = (id) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name: name
			})
		})
		peer.on("stream", (stream) => {
			
				userVideo.current.srcObject = stream
			
		})
		socket.on("callAccepted", (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer


	}

	const handleCallPerson = () => {
		dispatch(
			toggleCamera()
		)

	}

	const answerCall =() =>  {
		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: caller })
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()
	}


  
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
