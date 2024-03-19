import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addchatWindow } from '../../redux/chatWindow/chatWindowSlice';
import axios from 'axios';
import Searchbar from './Searchbar';

export default function ChatList({userId, friends}) {
    const [chat, setChat] = useState([]);
    const dispatch = useDispatch();

    const handleOnClickChat = (friend) => {
        console.log(friend);
        dispatch(
            addchatWindow({
                chatModelId : friend.chatModelId,
                _id : friend._id,
                firstName: friend.firstName,
                lastName: friend.lastName,
                email: friend.email,
                dialCode: friend.dialCode,
                phoneNumber: friend.phoneNumber,
                dateofbirth: friend.dateofbirth
            })
        );
    }

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <div className="w-full">
                <Searchbar />
            </div>
            <div className="">
                {friends.map((friend) =>(
                    <div key={friend.chatModelId}
                    className="bg-gray-200 m-2 p-12 text-gray-600 font-medium rounded-md cursor-pointer"
                    onClick={() => handleOnClickChat(friend)}
                    >
                        {friend.firstName}
                    </div>
                ) )}
            </div>
        </div>
    );
}
