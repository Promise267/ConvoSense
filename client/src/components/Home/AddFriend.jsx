import axios from 'axios'
import React, {useState, useEffect} from 'react'
import {toast} from "react-toastify"
export default function AddFriend({userId}) {


  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [receiver, setSelectedReceiver] = useState('')


  const [sentrequests, setsentRequests] = useState([]);

  const handleAddRequest = async(e) => {
    e.preventDefault();
    try {
        const result = await axios.post("http://localhost:5000/send-chat-request", { senderId: userId, receiverId: receiver._id });
        console.log(result);
        toast.success(result.data.message)
        fetchSentChatRequest();
    } catch (err) {
      if (err.response.status === 409){
        toast.warn(err.response.data.message)
      }
    }
  }

  const handleRevokeRequest = async(id) => {
    try {
      await axios.delete('http://localhost:5000/delete-sent-chat-request', {
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
      if (searchQuery.trim() === '') {
          setFilteredUsers([]);
          return;
      }

      const filtered = users.filter(user =>
        user.phoneNumber.includes(searchQuery) && !user._id.includes(userId)

      );
      setFilteredUsers(filtered);
    }, [searchQuery, users]);



    const fetchSentChatRequest = async () => {
      try {
        const response = await axios.post("http://localhost:5000/get-sent-chat-request", { userId: userId });
        const requests = response.data.filter(req => req.status === "pending");
        setsentRequests(requests);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(()=>{

    if(userId){
      fetchSentChatRequest();
    }
  },[userId])



  return (
    <div className="flex flex-col h-screen">
      <input
        type="text"
        maxlength="10"
        placeholder="Search by phone number"
        className="w-100 text-center p-2 leading-tight hover:shadow-lg transition duration-300 focus:outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="w-full">
        <form action="" onSubmit={handleAddRequest}>
          <div className="flex flex-row space-x-2 px-2">
              <div className="w-full">
                  <select
                      className="w-full p-1 leading-tight hover:shadow-lg transition duration-300 focus:outline-none"
                      value={receiver.phoneNumber}
                      onChange={(e) => setSelectedReceiver(filteredUsers.find(user => user.phoneNumber === e.target.value))}
                      >
                        {searchQuery? <option value="">{searchQuery}</option>
                        : <option value="" disabled>Numbers</option>}

                      {filteredUsers.map(user => (
                      <option key={user._id} value={user.phoneNumber}>{user.dialCode}{user.phoneNumber}</option>

                      ))}
                  </select>
              </div>
              <div>
                <button type="submit" className="bg-orange-500 text-white rounded py-1 px-3" onClick={handleAddRequest}>Add</button>
              </div>
          </div>
        </form>
        <div className="bg-gray-50 rounded-sm h-dvh w-full">
        {sentrequests.map((request) => (
          (request.sender._id === userId) ? (
            <div key={request._id}>
              <div className="bg-gray-100 text-gray-600 m-2 p-5 rounded-md text-center space-y-2">
                <p className="text-sm">You sent a chat request to <span className="font-medium">{request.receiver.dialCode} {request.receiver.phoneNumber} {request.receiver.firstName} {request.receiver.lastName}</span></p>
                <button className="bg-customGradient rounded-md w-full text-white" onClick={() => handleRevokeRequest(request._id)}>Revoke</button>
              </div>
            </div>
          ) : null
        ))}
        </div>
      </div>
    </div>
  )
}
