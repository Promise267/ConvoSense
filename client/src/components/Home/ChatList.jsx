import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addchatWindow } from '../../redux/chatWindow/chatWindowSlice';
import axios from 'axios';
import Searchbar from './Searchbar';

export default function ChatList({ userId, friends, socket }) {
    const [selectedChat, setSelectedChat] = useState(null); // State to keep track of selected chat
    const dispatch = useDispatch();

    const handleOnClickChat = (friend) => {
        socket.emit("joinRoom", {userId : userId, chatModelId : friend.chatModelId})
        dispatch(
            addchatWindow({
                chatModelId: friend.chatModelId,
                userId: userId,
                friendId: friend._id,
                firstName: friend.firstName,
                lastName: friend.lastName,
                email: friend.email,
                dialCode: friend.dialCode,
                phoneNumber: friend.phoneNumber,
                dateofbirth: friend.dateofbirth
            })
        );
        setSelectedChat(friend.chatModelId);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <div className="w-full">
                <Searchbar />
            </div>
            <div className="">
                {friends.map((friend) => (
                    <div
                        key={friend.chatModelId}
                        className={`bg-gray-200 m-2 p-12 text-gray-600 font-medium rounded-md cursor-pointer ${selectedChat === friend.chatModelId ? 'bg-customGradient text-white' : ''}`} // Apply 'bg-blue-200' class if the chat is selected
                        onClick={() => handleOnClickChat(friend)}
                    >
                        {friend.firstName}
                    </div>
                ))}
            </div>
        </div>
    );
}
