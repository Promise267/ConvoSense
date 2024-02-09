import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faImage, faVideo, faPhone } from '@fortawesome/free-solid-svg-icons'

export default function ChatRoomInfo() {
  return (
    <>
    <div className="flex justify-between items-center m-4">
      <div className="flex flex-col space-y-2">
        <div className="flex flex-row justify-center items-center space-x-5 first">
          <FontAwesomeIcon icon={faImage} size='2xl' />
          <p>PersonName</p>
        </div>
        <div>
          <p className="text-xs">Active Status</p>
        </div>
      </div>

      <div className="flex flex-row space-x-4">
        <FontAwesomeIcon icon={faVideo} size='2xl' />
        <FontAwesomeIcon icon={faPhone} size='2xl' />
      </div>

    </div>
    </>
  )
}
