import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faImage, faVideo, faPaperPlane, faPaperclip } from '@fortawesome/free-solid-svg-icons'

export default function MessageInput() {
  return (
    <>
    <div class="flex">
      <div class="flex flex-none justify-center items-center m-5">
        <FontAwesomeIcon icon={faPaperclip} size='2xl' style={{ color:  "#9ca3af" }}/>
      </div>
      <div class="flex-1">
        <input
          type="text"
          className="pl-4 pr-10 py-7 border rounded-lg w-full focus:outline-none border-none"
          placeholder="Search"
        />
      </div>
      <div class="flex flex-none justify-center items-center m-5">
        <FontAwesomeIcon icon={faPaperPlane} size='2xl' style={{ color:  "#9ca3af" }}/>
      </div>
    </div>
    </>
  )
}
