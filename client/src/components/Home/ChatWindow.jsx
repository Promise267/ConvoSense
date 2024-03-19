import React from 'react'
import ChatRoomInfo from './ChatRoomInfo'
import MessageInput from './MessageInput'
import Message from "./Message"
import Camera from "./Camera"
import { useSelector } from 'react-redux'

export default function ChatWindow() {
  const getCameraStatus = useSelector(state => state.cameraStatus)
  const getchatWindow = useSelector(state => state.persistReducedReducer.chatWindow);
  return (
    <>
    <div className="flex flex-col h-screen">
        <div className="bg-customGradient">
            <ChatRoomInfo chatModelId = {getchatWindow.chatModelId} firstName = {getchatWindow.firstName} lastName = {getchatWindow.lastName} dialCode = {getchatWindow.dialCode} phoneNumber = {getchatWindow.phoneNumber}/>
        </div>
        <div className="h-dvh bg-gray-300">
        {getCameraStatus.stateOfCamera ? (
          <Camera />
        ) : (
          <Message
          chatModelId={getchatWindow.chatModelId}
          receiverId={getchatWindow._id}
          firstName={getchatWindow.firstName}
          lastName={getchatWindow.lastName}
          dialCode={getchatWindow.dialCode}
          phoneNumber={getchatWindow.phoneNumber}
        />
        )}
        </div>
        <div>
            <MessageInput chatModelId = {getchatWindow.chatModelId} firstName = {getchatWindow.firstName} lastName = {getchatWindow.lastName} dialCode = {getchatWindow.dialCode} phoneNumber = {getchatWindow.phoneNumber}/>
        </div>
    </div>
    </>
  )
}
