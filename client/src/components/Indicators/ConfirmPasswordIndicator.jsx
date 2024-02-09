import React from 'react'

export default function ConfirmPasswordIndicator({password, confirmPassword}) {
    let strengthBar = "bg-red-500 h-1 mx-1"
    let strengthClass = 'ml-3 text-red-500 font-sans text-xs';
    let strengthText = 'Password doesnot match';
    if(confirmPassword == ""){
      strengthBar = ""
      strengthClass = "";
      strengthText = "";
    }
    else if(password == confirmPassword){
      strengthBar = "bg-green-500 h-1 mx-1"
      strengthClass = 'ml-3 text-green-500 font-sans text-xs';
      strengthText = 'Password matches';
    }
  return (
    <>
      <div className="mt-2">
        <div className={strengthBar}></div>
        <span className={strengthClass}>{strengthText}</span>
      </div>
    </>
  )
}
