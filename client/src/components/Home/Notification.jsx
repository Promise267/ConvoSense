import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export default function Notification() {

  const [chatrequests, setChatRequests] = useState([]);
  const [chatRequestsUsers, setChatRequestsUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setcurrentUser] = useState('')
  const getCredential = useSelector(state => state.persistReducedReducer.credential);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user/getUser');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []);
  
  useEffect(() => {
    if (users) {
      const findCurrentUser = users.find((user) =>
        user.phoneNumber === getCredential.phoneNumber
      );
      setcurrentUser(findCurrentUser);
    }
  }, [users, getCredential]);
  
  useEffect(() => {
    const fetchChatRequests = async () => {
      if (currentUser) {
        try {
          const response = await axios.post("http://localhost:5000/get-chat-request", { userId: currentUser._id })
          setChatRequests(response.data)
        } catch (error) {
          console.error('Error fetching chat requests:', error);
        }
      }
    };
    
    fetchChatRequests();
  }, [currentUser]);

  useEffect(() => {
    if (chatrequests && users) {
      const chatUsers = chatrequests.map(request => {
        const user = users.find(u => u._id === request.senderId);
        return { ...request, user };
      });
      setChatRequestsUser(chatUsers); // Uncomment this line
    }
  }, [chatrequests, users]);


  const handleAcceptChatRequest = () =>{

  }

  const handleRejectChatRequest = () =>{
    
  }



  //console.log(chatRequestsUsers)
  return (
    <div className="text-black">
      <div className="flex flex-col h-screen">
        <div className="bg-gray-50 rounded-sm h-dvh w-full text-center text-gray-800">
          {chatRequestsUsers.length > 0 && (
            <div className="space-y-5">
              {chatRequestsUsers.map((requests) => (
                <div key={requests.user._id} className="bg-gray-200 m-2 p-6 rounded-md">
                  <p className="text-sm"><span className="font-bold">{requests.user.dialCode} {requests.user.phoneNumber}</span> {requests.user.firstName} {requests.user.lastName} sent you a chat request!</p>
                  <div className="flex flex-row justify-between mt-5 space-x-1">
                    <button className="bg-gray-100 rounded-md w-full p-1 text-orange-500 transition-all hover:opacity-70 hover:duration-300" onClick={() => handleAcceptChatRequest(requests._id)}>
                      Accept
                    </button>
                    <button className="bg-orange-500 rounded-md w-full p-1 text-white transition-all hover:opacity-70 hover:duration-300">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
