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
import { io } from 'socket.io-client';

const socket = io.connect("http://localhost:5000");
export default function Home() {
  let showComponent = useRef(false);
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const getTokenFromBrowser = Cookies.get("accessToken")
  const getToken = useSelector(state => state.authentication);
  const getchatWindow = useSelector(state => state.persistReducedReducer.chatWindow);
  const isChatWindowEmpty = getchatWindow._id > 0;
  const getCredential = useSelector(state => state.persistReducedReducer.credential);
  //console.log(`chatWindow : ${getchatWindow._id}`);
  const dispatch = useDispatch();

  const [friends, setFriends] = useState([]);

  const fetchFriends = async () => {
    try {
      const response = await axios.get("http://localhost:5000/get-all-chat-models");
      const chatmodels = response.data;

      // Initialize an array to store all friends with their chat model IDs
      let allFriends = [];

      // Iterate over each chatmodel to find friends
      chatmodels.forEach(chatmodel => {
        // Find the chatmodel containing the logged-in user
        const userChatmodel = chatmodel.users.find(user => user._id === userId);
        if (userChatmodel) {
          // Exclude the current user's details from the chatmodel and store the rest
          const otherUsers = chatmodel.users.filter(user => user._id !== userId);
          // Store each friend along with their chat model ID
          otherUsers.forEach(friend => {
            allFriends.push({
              chatModelId: chatmodel._id,
              ...friend
            });
          });
        }
      });

      // Set the friends state with unique friends
      setFriends([...new Map(allFriends.map(user => [user._id, user])).values()]);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  useEffect(()=>{
    socket.on("connect", ()=>{
      console.log("Connected to socket.io server")
    })
  })




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

  useEffect(() => {
    const fetchUsers = () => {
        const url = `${import.meta.env.VITE_BACKEND_URI}/user/getUser`;
        try {
            axios.get(url).then((result) => {
                const user = result.data.find(u => u.phoneNumber === getCredential.phoneNumber)
                setUserId(user._id);
                fetchFriends(); // Call fetchFriends after userId is set
            }).catch((err) => {
                console.log(err);
            });
        } catch (error) {
            console.log(error);
        }
    }

    fetchUsers();
}, [getCredential.phoneNumber, userId]);

  useEffect(()=>{
    socket.emit("login", { userId: userId} );
    fetchFriends();
}, [userId])

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
              <Route path="/messages" element={<ChatList userId = {userId} friends = {friends} socket = {socket}/>}/>
              <Route path="/calls" element={<Call userId = {userId}/>}/>
              <Route path="/profile" element={<Profile userId = {userId}/>}/>
              <Route path="/notifications" element={<Notification userId = {userId}/>}/>
              <Route path="/addfriend" element={<AddFriend userId = {userId}/>}/>
            </Routes>
          </div>
          <div className="flex-1">
            {isChatWindowEmpty? "" : <ChatWindow socket = {socket}/>}
          </div>
        </div>:
        ""
    }
    </>
  )
}
