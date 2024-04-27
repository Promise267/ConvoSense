import React from 'react'
import {useSelector, useDispatch} from "react-redux"


export default function Profile() {

  const getCredentials = useSelector((state) => state.persistReducedReducer.credential)

  return (
    <>
    <div className="flex flex-col justify-center items-center space-y-6 mt-6">
      <div className="text-2xl">
        Your Information
      </div>
      <div className="bg-gray-100 p-2 space-y-3">
        <div className="flex flex-row bg-gray-200 p-2 cursor-pointer">
          <label htmlFor="">First Name :&nbsp;</label>
          <p className="">{getCredentials.firstName}</p>
        </div>
        <div className="flex flex-row bg-gray-200 p-2">
          <label htmlFor="">Last Name :&nbsp;</label>
          <p>{getCredentials.lastName}</p>
        </div>
        <div className="flex flex-row bg-gray-200 p-2">
          <label htmlFor="">Email :&nbsp;</label>
          <p>{getCredentials.email}</p>
        </div>
        <div className="flex flex-row bg-gray-200 p-2">
          <label htmlFor="">Gender :&nbsp;</label>
          <p>{getCredentials.gender}</p>
        </div>
        <div className="flex flex-row bg-gray-200 p-2">
          <label htmlFor="">Date Of Birth :&nbsp;</label>
          <p>{getCredentials.dateofbirth}</p>
        </div>
        <div className="flex flex-row bg-gray-200 p-2">
          <label htmlFor="">Dial Code :&nbsp;</label>
          <p>{getCredentials.dialCode}</p>
        </div>
        <div className="flex flex-row bg-gray-200 p-2">
          <label htmlFor="">PhoneNumber :&nbsp;</label>
          <p>{getCredentials.phoneNumber}</p>
        </div>
      </div>
    </div>
    </>
  )
}
