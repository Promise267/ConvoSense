import React, { useState } from 'react'
import ConveSenseImage from "../../assets/convoSense.png"
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  let [open, setOpen] = useState(false);

  let handleOpen = () => {
    setOpen(!open)
  }

  const Links = [
    {
      name : "About", route : "/about"
    }
]

  return (
    <>
    <div>
      <div className="max-w-screen-xl mx-auto">
        <div className={`flex items-center justify-between mt-5 mx-5`}>

          <div className="flex flex-row items-center space-x-2">
            <img src={ConveSenseImage} alt="convosense" className="w-16" />
            <p className="font-sans font-medium text-xl">ConvoSense</p>
          </div>

          <div>
            <ul className="hidden font-sans text-gray-600 font-medium md:flex md:flex-row md:space-x-12">
              {Links.map((link)=>(
                <li key={link.name}><NavLink to={link.route}>{link.name}</NavLink></li>
              ))}
            </ul>
          </div>
          
          <div onClick={handleOpen} className='text-3xl right-8 top-6 cursor-pointer md:hidden'>
            <ion-icon name={open ? 'close':'menu'}></ion-icon>
          </div>

        </div>
        <div className="max-w-screen-xl mx-auto bg-gray-100 md:hidden">
          {
            open ?
          <div className="cursor-pointer">
            <ul className="font-sans text-white font-medium space-y-4 p-3 text-center">
              {Links.map((link)=>(
                <li key={link.name} className="p-3 bg-orange-500 rounded-lg hover:opacity-75 hover:shadow transition-all duration-300 "><NavLink to={link.route}>{link.name}</NavLink></li>
              ))}
            </ul>
          </div>
          :
          ""
          }
        </div>

      </div>
    </div>
    </>
  )
}
