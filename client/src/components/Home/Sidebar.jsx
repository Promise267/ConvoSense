import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUser, faPhone, faMessage, faBell, faImage, faGear } from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {
  return (
    <>
    <div className="flex flex-col h-screen bg-blue-950 justify-between">
        <div className="first space-y-10">
            <div className='m-3 mt-10'>
                <FontAwesomeIcon icon={faUser} size='2xl' style={{color: "#ffffff",}} />
            </div>
            <div className='m-3'>
                <FontAwesomeIcon icon={faPhone} size='2xl' style={{color: "#ffffff",}} />
            </div>
            <div className='m-3'>
                <FontAwesomeIcon icon={faMessage} size='2xl' style={{color: "#ffffff",}} />
            </div>
            <div className='m-3'>
                <FontAwesomeIcon icon={faBell} size='2xl' style={{color: "#ffffff",}} />
            </div>
        </div>

        <div className='second'>
            <div className="m-3 mb-10">
                <FontAwesomeIcon icon={faImage} size='2xl' style={{color: "#ffffff",}}/>
            </div>
            <div className="m-3 mb-10">
                <FontAwesomeIcon icon={faGear} size='2xl' style={{color: "#ffffff",}}/>
            </div>
        </div>
    </div>

    </>
  )
}
