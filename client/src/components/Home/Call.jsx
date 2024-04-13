import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faArrowUp, faArrowDown} from '@fortawesome/free-solid-svg-icons'

export default function Call() {
  return (
    <>
    <div className="flex flex-col h-screen">
    
    <div className="bg-gray-50 rounded-sm h-dvh w-full">
      <div className="bg-gray-300 m-2 p-6 rounded-md">

        <div className="flex justify-end">
          <div className="absolute">
            <div className="relative top-0 right-0">
              <p className=" text-xs">4min ago</p>
            </div>
          </div>
        </div>

        <div className="flex flex-row mt-8 space-x-2 justify-center">
          <div>
          <span className="material-symbols-outlined">
            phone_forwarded
          </span>
          </div>
          <div className="">
            <p>+977984236484</p>
          </div>
        </div>

      </div>


      <div className="bg-gray-300 m-2 p-6 rounded-md">

        <div className="flex justify-end">
          <div className="absolute">
            <div className="relative top-0 right-0">
              <p className=" text-xs">4min ago</p>
            </div>
          </div>
        </div>

        <div className="flex flex-row mt-8 space-x-2 justify-center">
          <div>
          <span className="material-symbols-outlined">
            phone_callback
          </span>
          </div>
          <div>
            <p>+977984236484</p>
          </div>
        </div>

      </div>

      <div className="bg-gray-300 m-2 p-6 rounded-md">

        <div className="flex justify-end">
          <div className="absolute">
            <div className="relative top-0 right-0">
              <p className=" text-xs">4min ago</p>
            </div>
          </div>
        </div>

        <div className="flex flex-row mt-8 space-x-2 justify-center">
          <div>
          <span className="material-symbols-outlined">
            phone_missed
          </span>
          </div>
          <div>
            <p>+977984236484</p>
          </div>
        </div>

        </div>

    </div>


    </div>
    </>
  )
}
