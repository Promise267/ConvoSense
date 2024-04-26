import React, { useState, useEffect, useMemo } from 'react';
import ChatRoomInfo from './ChatRoomInfo';
import MessageInput from './MessageInput';
import Message from "./Message";
import Camera from "./Camera";
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function ChatWindow({ socket }) {
  const getchatWindow = useSelector(state => state.persistReducedReducer.chatWindow);
  const [messages, setMessages] = useState([]);

  const getMessages = () => {
    axios.post("http://localhost:5000/get-chat-message", { chatmodelId: getchatWindow.chatModelId })
      .then((result) => {
        setMessages(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      console.log("Socket connected:", socket.connected);
      socket.on("receiveMessage", (data) => {
        console.log("Received message:", data);
        setMessages((list) => [...list, data]);
      });
  }, 1000); // Delay in milliseconds
  }, [getchatWindow.chatModelId, socket]);

  useEffect(()=>{
    getMessages();
  },[messages])


  const sendMessage = (messageContent) => {
    const currentDate = new Date().toISOString();
    const newMessage = { content: messageContent, sender: {_id : getchatWindow.userId }, createdAt : currentDate, chatModel : {_id : getchatWindow.chatModelId}}
    axios.post("http://localhost:5000/send-chat-message", {
      senderId: getchatWindow.userId,
      content: messageContent,
      chatmodelId: getchatWindow.chatModelId
    })
    .catch((err) => {
      console.log(err);
    });
      setMessages([...messages, newMessage]); // Append the message to messages state
    };
    

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="bg-orange-500">
          <ChatRoomInfo
            socket={socket}
            friendId = {getchatWindow.friendId}
            chatModelId={getchatWindow.chatModelId}
            firstName={getchatWindow.firstName}
            lastName={getchatWindow.lastName}
            dialCode={getchatWindow.dialCode}
            phoneNumber={getchatWindow.phoneNumber}
          />
        </div>
        <div className="h-dvh bg-gray-100">
            <Message
              socket={socket}
              messages={messages}
              userId={getchatWindow.userId}
              chatModelId={getchatWindow.chatModelId}
              receiverId={getchatWindow.friendId}
              firstName={getchatWindow.firstName}
              lastName={getchatWindow.lastName}
              dialCode={getchatWindow.dialCode}
              phoneNumber={getchatWindow.phoneNumber}
            />
        </div>
        <div>
          <MessageInput
            sendMessage={sendMessage}
            socket={socket}
            chatModelId={getchatWindow.chatModelId}
            userId={getchatWindow.userId}
            receiverId={getchatWindow.friendId}
            firstName={getchatWindow.firstName}
            lastName={getchatWindow.lastName}
            dialCode={getchatWindow.dialCode}
            phoneNumber={getchatWindow.phoneNumber}
          />
        </div>
      </div>
    </>
  );
}
