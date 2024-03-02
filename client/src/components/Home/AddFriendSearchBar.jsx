import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function AddFriendSearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [sender, setSender] = useState('')
    const [receiver, setSelectedReceiver] = useState('')
    
    const [users, setUsers] = useState([]);
    const [sentRequest, setSentRequest] = useState([]);
    const[sentchatRequestUser, setsentchatRequestUser] = useState([]);
    const [receiverData, setreceiverData] = useState([]);
    const getCredential = useSelector(state => state.persistReducedReducer.credential);


    //to fetch all the users in the database
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

        const findCurrentUser = users.find((user) =>
            user.phoneNumber === getCredential.phoneNumber
        );
        setSender(findCurrentUser);

      }, [users]);

      //get all the receiverIds of the sentchatrequest
      useEffect(()=>{
        if(sentRequest){
          const receiverIds = sentRequest.map((request) => request.receiverId);
          setsentchatRequestUser(receiverIds)
        }
        },[sentRequest])

      //get the data of the receiverIds from user

      useEffect(() => {
        if (sentchatRequestUser.length > 0) {
          const receiverUserData = users.filter((user) =>
            sentchatRequestUser.includes(user._id)
          );
          setreceiverData(receiverUserData);
        }
      }, [users, sentchatRequestUser]);

      //fetch all the chatrequests of the the current logged in user or the sender
      useEffect(() => {
        const fetchSentRequests = async () => {
          try {
            if (sender && sender._id) { // Ensure sender is defined and has _id property
              const response = await axios.post("http://localhost:5000/get-sent-chat-request", { userId: sender._id });
              setSentRequest(response.data);
            }
          } catch (error) {
            console.log(error);
          }
        };
      
        if (sender && sender._id && sentRequest.length === 0) { // Fetch only if sender and sentRequest are not empty
          fetchSentRequests();
        }
      }, [sender, sentRequest]); // Include sentRequest in the dependencies


      //to filter the users according to the types searchQuery in the select option list
      useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredUsers([]);
            return;
        }

        const filtered = users.filter(user =>
          user.phoneNumber.includes(searchQuery)
        );
        setFilteredUsers(filtered);
      }, [searchQuery, users]);



      const handleAddRequest = async (e) => {
        e.preventDefault();
        if (receiver !== "") { // Check if selectedUser is not an empty string
            const findUser = users.find((user) =>
                user._id === receiver._id
            );
            setSelectedReceiver(findUser);
            if (findUser) { // Check if findUser is not undefined
                try {
                    const result = await axios.post("http://localhost:5000/send-chat-request", { senderId: sender._id, receiverId: receiver._id });
                    console.log(result);
                    toast.success(result.data.message)
                    setSender("")
                    setSelectedReceiver("")
                    setSearchQuery("")
                } catch (err) {
                  if (err.response && err.response.status === 409){
                    toast.warn(err.response.data.message)
                  }
                  console.log(err);
                }
            } else {
              toast.error("User not found")
            }
        } else {
          toast.error("Please select a user before adding.")
        }
    }


    return (
    <>
    <div className="flex flex-col m-5">
        <div className="flex flex-col">
            <input
                type="text"
                maxlength="10"
                placeholder="Search by phone number"
                className="w-100 text-center p-2 leading-tight hover:shadow-lg transition duration-300 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
        <form action="" onSubmit={handleAddRequest}>
          <div className="flex flex-row space-x-2 p-2">
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
                  <button type="submit" className="bg-orange-500 text-white rounded py-1 px-3">Add</button>
              </div>
          </div>
        </form>
    </div>
    <div className="flex flex-col m-5">
      {receiverData && (
          <div className="space-y-5">
            {receiverData.map((user) => (
              <div className="p-4 bg-gray-100 rounded-md" key={user._id}>
                <p className="text-center text-sm">
                  You sent a chat request to <span className="font-bold">{user.dialCode} {user.phoneNumber}</span> {user.firstName} {user.lastName}
                </p>
                <button className="bg-customGradient text-white w-full rounded mt-2 transition-all hover:opacity-80 hover:duration-300">Revoke</button>
              </div>
            ))}
          </div>
      )}
    </div>
    </>
    );
}
