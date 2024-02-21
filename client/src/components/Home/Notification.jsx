import React from 'react'

export default function Notification() {


  return (
    <div>
    <div className="flex flex-col h-screen">
        <div className="bg-gray-50 rounded-sm h-dvh w-full text-center text-gray-800">

            <div className="bg-gray-200 m-2 p-6">
                <p className="text-sm">This person has sent you a chat request</p>
              <div className="flex flex-row justify-between mt-5 space-x-1">
                <button className="bg-gray-100 rounded-md w-full p-1 text-orange-500">
                  Accept
                </button>
                <button className="bg-orange-500 rounded-md w-full p-1 text-gra">
                    Reject
                </button>
              </div>
            </div>

            <div className="bg-gray-200 m-2 p-6">
                <p className="text-sm">This person has sent you a chat request</p>
              <div className="flex flex-row justify-between mt-5 space-x-1">
                <button className="bg-gray-100 rounded-md w-full p-1 text-orange-500">
                  Accept
                </button>
                <button className="bg-orange-500 rounded-md w-full p-1">
                    Reject
                </button>
              </div>
            </div>

            <div className="bg-gray-200 m-2 p-6">
                <p className="text-sm">This person has sent you a chat request</p>
              <div className="flex flex-row justify-between mt-5 space-x-1">
                <button className="bg-gray-100 rounded-md w-full p-1 text-orange-500">
                  Accept
                </button>
                <button className="bg-orange-500 rounded-md w-full p-1">
                    Reject
                </button>
              </div>
            </div>

        </div>
    </div>

    </div>
  )
}
