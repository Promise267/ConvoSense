import React, {useState} from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import LoginPageImage from "../../assets/loginPage.jpg";
import LoginModal from './LoginModal';

export default function Login() {
  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <LoginModal/>
          <div className="relative z-0">
            <img src={LoginPageImage} alt="" className=" rounded" />
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-l from-transparent to-white z-0"></div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
