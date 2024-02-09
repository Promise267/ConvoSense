import React from 'react'

export default function FieldIndicators({text}) {
    let strengthBar = ""
    let strengthClass = 'ml-3 text-red-500 font-sans text-xs';
    let strengthText = 'Required*';

    if(text.length == 0){
    }
    else if(text === null){
      
    }
    else{
        strengthBar = ''
        strengthClass = '';
        strengthText = '';
    }
  return (
    <>
    <div className="mt-2">
        <span className={strengthClass}>{strengthText}</span>
    </div>
    </>
  )
}
