import React from 'react'

export default function PasswordStrengthIndicator({password}) {
    let strengthBar = "bg-red-500 h-1 mx-1"
    let strengthClass = 'ml-3 text-red-500 font-sans text-xs';
    let strengthText = 'Poor';
    if(password.length == 0){
        strengthBar = ''
        strengthClass = '';
        strengthText = '';
    }
    else if (password.length >= 6 && password.length < 10) {
        strengthBar = "bg-yellow-500 h-1 mx-1"
        strengthClass = 'ml-3 text-yellow-500 font-sans text-xs';
        strengthText = 'Average';
    } else if (password.length >= 10) {
        strengthBar = "bg-green-500 h-1 mx-1"
        strengthClass = 'ml-3 text-green-500 font-sans text-xs';
        strengthText = 'Strong';
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
