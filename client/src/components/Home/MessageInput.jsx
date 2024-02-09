import React from 'react'

export default function MessageInput() {
  return (
    <>
    <div classNameName="">
      <div className="relative">
        <input
          type="text"
          className="pl-4 pr-10 py-7 border rounded-lg w-full focus:outline-none"
          placeholder="Search"/>
        <div>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </span>
        </div>
      </div>
    </div>
    </>
  )
}
