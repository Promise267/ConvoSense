import React, { useState, useEffect } from 'react';
import ChatRoomInfo from './ChatRoomInfo';
import MessageInput from './MessageInput';
import Message from "./Message";
import Camera from "./Camera";
import { useSelector } from 'react-redux';
import axios from 'axios';


export default function ChatWindow({socket}) {
  const getCameraStatus = useSelector(state => state.cameraStatus);
  const getchatWindow = useSelector(state => state.persistReducedReducer.chatWindow);
  const [messages, setMessages] = useState([]);



  useEffect(() => {
    const getMessages = () => {
      axios.post("http://localhost:5000/get-chat-message", { chatmodelId: getchatWindow.chatModelId })
        .then((result) => {
          setMessages(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getMessages();
  }, [getchatWindow.chatModelId]);


const sendMessage = (messageContent) => {
  const newMessage = { content: messageContent, senderId: getchatWindow.userId };
  setMessages([...messages, newMessage]); // Append the message to messages state
  axios.post("http://localhost:5000/send-chat-message", {
    senderId: getchatWindow.userId,
    content: messageContent,
    chatmodelId: getchatWindow.chatModelId
  })
  .catch((err) => {
    console.log(err);
  });
};

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="bg-orange-500">
          <ChatRoomInfo
            chatModelId={getchatWindow.chatModelId}
            firstName={getchatWindow.firstName}
            lastName={getchatWindow.lastName}
            dialCode={getchatWindow.dialCode}
            phoneNumber={getchatWindow.phoneNumber}
          />
        </div>
        <div className="h-dvh bg-gray-100">
          {getCameraStatus.stateOfCamera ? (
            <Camera />
          ) : (
            <Message
              messages={messages}
              userId = {getchatWindow.userId}
              chatModelId={getchatWindow.chatModelId}
              receiverId={getchatWindow.friendId}
              firstName={getchatWindow.firstName}
              lastName={getchatWindow.lastName}
              dialCode={getchatWindow.dialCode}
              phoneNumber={getchatWindow.phoneNumber}
            />
          )}
        </div>
        <div>
          <MessageInput
            chatModelId={getchatWindow.chatModelId}
            userId={getchatWindow.userId}
            sendMessage={sendMessage}
            socket = {socket}
          />
        </div>
      </div>
    </>
  );
}
