import React from 'react'
import Searchbar from './Searchbar'

export default function AddFriend() {
  return (
    <div className="flex flex-col h-screen">
        <div className="w-full">
            <Searchbar/>
        </div>
        <div className="bg-gray-50 rounded-sm h-dvh w-full">

            <div className="lg:flex-row lg:items-center lg:justify-between flex flex-col items-center bg-gray-200 m-2 p-6 space-y-3 rounded-md text-center">
              <div>
                <p className= "font-sans">Chat Request Sent to +978783423!</p>
              </div>
              <div>
                <button className="w-full bg-white text-orange-500 px-4 py-2 hover:text-white hover:bg-orange-500 transition-all duration-300 rounded-md text-sm">Revoke</button>
              </div>
            </div>

            <div className="bg-gray-200 m-2 p-6 rounded-md">
                P2
            </div>

            <div className="bg-gray-200 m-2 p-6 rounded-md">
                P3
            </div>
        </div>
    </div>
  )
}
