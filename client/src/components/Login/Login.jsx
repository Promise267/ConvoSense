import React, {useState} from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import LoginPageImage from "../../assets/loginPage.jpg";
import PhoneInput from "react-phone-input-2";
import {GoogleLoginButton} from "react-social-login-buttons"
import {FacebookLoginButton} from "react-social-login-buttons"
import {NavLink} from 'react-router-dom';

export default function Login() {
  
  const [dialCode, setDialCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col justify-center space-x-12 z-10">
            <div className="flex flex-col text-gradient text-7xl">
              <p className="font-medium m-5">Hang out</p>
              <p className="font-medium m-5 mt-[-1rem]">anytime</p>
              <p className="font-medium m-5 mt-[-1rem]">anywhere!</p>
            </div>
            <div className="flex flex-col mt-8 mb-8">
              <form action="">
              <PhoneInput
                    country={'us'}
                    name="phoneNumber"
                    id="phoneNumber"
                    inputProps={{
                        name: 'phone',
                        required: true,
                    }}
                    value={phoneNumber}
                    onChange={(value, country, event, formattedValue) => {
                        setDialCode(country.dialCode)
                        const extractedPhoneNumber = formattedValue.replace(value?.dialCode, '');
                        setPhoneNumber(extractedPhoneNumber);
                    }}
                />
                <input
                  className="appearance-none rounded mt-4 py-3 px-4 mr-2 text-gray-700 leading-tight hover:shadow-lg transition duration-300 focus:outline-none w-5/6"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  />
                <button
                  className="w-5/6 mt-4  bg-orange-500 text-white font-medium py-2 px-4 rounded hover:opacity-75 hover:shadow-lg transition  duration-300 ease-in-out"
                  type="submit"
                  >
                      Log In
                  </button>
              </form>
              <hr className="mt-12 mb-12"/>
              <div className="flex flex-col space-x-4 mr-16">
              <GoogleLoginButton onClick={() => alert("Hello")}>
                <span className="text-sm ">Sign In With Google</span>
              </GoogleLoginButton>
              <FacebookLoginButton onClick={() => alert("Hello")}>
                <span className="text-sm">Sign In With Facebook</span>
              </FacebookLoginButton>
              </div>
              <div>
                <p className="text-sm font-light text-gray-500">Dont have an account? <span className="font-medium text-primary-600 hover:underline"><NavLink to="/register">Register</NavLink></span></p>
              </div>
            </div>
          </div>
          <div className="relative z-0">
            <img src={LoginPageImage} alt="" className=" rounded" />
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-l from-transparent to-white z-0"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
