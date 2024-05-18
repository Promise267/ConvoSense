import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';

export default function Notification({userId}) {
  const [requests, setRequests] = useState([]);

  const handleAcceptChatRequest = (id) => {
    try {
      axios.patch("http://localhost:5000/approve-chat-request", {chatrequestId : id, userId : userId}).then((result) => {
        toast.success(result.data.message)
        fetchSentChatRequest()
      }).catch((err) => {
        console.log(err);
      });
    } catch (error) {
      console.log(error);
    }
  }


  const handleAcceptRejectRequest = async(id) => {
    try {
      await axios.delete('http://localhost:5000/delete-chat-request', {
        data: {
          chatrequestId: id,
          userId: userId
        }
      })
      .then(response => {
        toast.success(response.data.message)
        fetchSentChatRequest();
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
    } catch (error) {
      console.log(error);
    }
  }



  const fetchSentChatRequest = async() => {
    try {
      await axios.post("http://localhost:5000/get-chat-request", {userId : userId}).then((result) => {
        setRequests(result.data)
      }).catch((err) => {
        console.log(err);
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    if(userId){
      fetchSentChatRequest();
    }
  },[userId])
  return (
    <>
    <div className="flex flex-col h-screen">
      <div className="w-full">

      </div>


        <div className="bg-gray-50 rounded-sm h-dvh w-full">
        {requests.map((request) => (
          (request.receiver._id === userId && request.status === "pending") ? (
            <div className="bg-gray-300 m-2 p-10 rounded-md text-center" key={request._id}>
              <p className="text-sm"><span className="font-medium">{request.sender.dialCode} {request.sender.phoneNumber}</span> {request.sender.firstName} {request.sender.lastName} sent you a Chat Request</p>
              <div className="flex flex-row justify-between mt-5 space-x-1">
                <button className="bg-gray-100 rounded-md w-full p-1 text-orange-500 transition-all hover:opacity-70 hover:duration-300" onClick={() => handleAcceptChatRequest(request._id)}>
                  Accept
                </button>
                <button className="bg-orange-500 rounded-md w-full p-1 text-white transition-all hover:opacity-70 hover:duration-300" onClick={() => handleAcceptRejectRequest(request._id)}>
                  Reject
                </button>
              </div>
            </div>
          ) : null
        ))}
        </div>
      </div>
    </>
  )
}
