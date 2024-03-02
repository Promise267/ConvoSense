import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {ToastContainer, toast} from 'react-toastify';
import React, { useEffect, useRef, useMemo, useState } from 'react'
import Sidebar from "./Sidebar"
import ChatList from './ChatList'
import ChatWindow from "./ChatWindow"
import AddFriend from "./AddFriend"
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import Call from './Call';
import Notification from './Notification';
import Profile from './Profile';
import { Routes, Route } from 'react-router';
import { addCredentials } from '../../redux/verification/credentialSlice';

export default function Home() {
  let showComponent = useRef(false);
  const navigate = useNavigate();
  const getTokenFromBrowser = Cookies.get("accessToken")
  const getToken = useSelector(state => state.authentication);
  const getCredential = useSelector(state => state.persistReducedReducer.credential);
  const dispatch = useDispatch();


  const handleCookieValidity = async () => {
    const url = `${import.meta.env.VITE_BACKEND_URI}/verifyToken`;
    try {
      await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${getToken.token || getTokenFromBrowser}`
        },
        data : {
          phoneNumber : getCredential.phoneNumber
        }
      });

    } catch (err) {
      console.error(err);
      console.log("im here");
      navigate(`${err.response.data.redirect}`);
    }
  }

  useEffect(()=>{
    if(!getTokenFromBrowser)
    handleCookieValidity();
  },[getCredential.phoneNumber, getCredential.token, navigate, getToken])


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
            <Routes>
              <Route path="/messages" element={<ChatList />} />
              <Route path="/calls" element={<Call />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/notifications" element={<Notification/>}/>
              <Route path="/addfriend" element={<AddFriend/>} />
            </Routes>
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
