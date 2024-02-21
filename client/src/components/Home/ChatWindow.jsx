import React from 'react'
import ChatRoomInfo from './ChatRoomInfo'
import MessageInput from './MessageInput'
import Message from "./Message"

export default function ChatWindow() {
  return (
    <>
    <div className="flex flex-col h-screen">
        <div className="bg-customGradient">
            <ChatRoomInfo/>
        </div>
        <div className="h-dvh bg-gray-300">
            <Message/>
        </div>
        <div>
            <MessageInput/>
        </div>
    </div>
    </>
  )
}
