import React from 'react'
import Sidebar from "./Sidebar"
import ChatList from './ChatList'
import ChatWindow from "./ChatWindow"

export default function Home() {
  return (
    <>
    <div className="flex">
      <div className="flex-initial">
        <Sidebar/>
      </div>
      <div className="w-1/4">
        <ChatList/>
      </div>
      <div className="flex-1">
        <ChatWindow/>
      </div>
    </div>
    </>
  )
}
