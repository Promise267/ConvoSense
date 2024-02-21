import React from 'react'
import Searchbar from "./Searchbar"

export default function ChatList() {
  return (
    <>
    <div className="flex flex-col h-screen">
        <div className="w-full">
            <Searchbar/>
        </div>
        <div className="bg-gray-50 rounded-sm h-dvh w-full">

            <div className="bg-gray-300 m-2 p-6 rounded-md">
                P1
            </div>

            <div className="bg-gray-300 m-2 p-6 rounded-md">
                P2
            </div>

            <div className="bg-gray-300 m-2 p-6 rounded-md">
                P3
            </div>
        </div>
    </div>
    </>
  )
}
