import React from 'react'
import Searchbar from "./Searchbar"

export default function ChatList() {
  return (
    <>
    <div className="flex flex-col h-screen">
        <div className="w-full">
            <Searchbar/>
        </div>
        <div className="bg-red-200 rounded-sm h-dvh w-full">

            <div className="bg-green-200 m-2 p-6">
                P1
            </div>

            <div className="bg-green-200 m-2 p-6">
                P2
            </div>

            <div className="bg-green-200 m-2 p-6">
                P3
            </div>
        </div>
    </div>
    </>
  )
}
