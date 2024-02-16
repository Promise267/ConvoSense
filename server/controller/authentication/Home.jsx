import axios from 'axios'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {ToastContainer, toast} from 'react-toastify';
import React, { useEffect, useRef } from 'react'
import Sidebar from "./Sidebar"
import ChatList from './ChatList'
import ChatWindow from "./ChatWindow"
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const getCredential = useSelector(state => state.credential);
  const navigate = useNavigate();
  let showComponent = useRef(false);

  const handleCookieValidity = async() => {
    const url = `${import.meta.env.VITE_BACKEND_URI}` + "/verifyToken"
    axios.get(url,{withCredentials : true}).then((result) => {
      if(result){
        console.log(result);
        showComponent = true
      }
    }).catch((err) => {
      //console.log(`${err.response.data.message}`);
      //navigate(`${err.response.data.redirect}`);
    });
  }

  useEffect(()=>{
    handleCookieValidity();
  },[])


  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
    />
    {showComponent?
        <div className="flex">
          <div className="flex-initial">
            <Sidebar />
          </div>
          <div className="w-1/4">
            <ChatList />
          </div>
          <div className="flex-1">
            <ChatWindow />
          </div>
        </div>:
        ""
    }
    </>
  )
}
