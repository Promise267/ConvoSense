import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPaperclip, faTimesCircle, faMicrophone } from '@fortawesome/free-solid-svg-icons';

export default function MessageInput({ chatModelId, userId, sendMessage, socket }) {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null); // Define fileInputRef here

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      socket.emit("sendMessage", {roomId : chatModelId, senderId : userId, content : message, chatModelId : chatModelId})
      sendMessage(message);
      setMessage('');
      setFiles([]); // Clear selected files after sending message;
    }
  };

  const handleMicrophone = () => {
    const recognition = new window.webkitSpeechRecognition(); // Create a new SpeechRecognition instance

    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    if (!isListening) { // Start recognition if not already listening
      setIsListening(true);

      recognition.start();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false); // Reset listening state on error
      };

      recognition.onend = () => {
        setIsListening(false); // Reset listening state when recognition ends
      };
    } else { // Stop recognition if already listening
      setIsListening(false);
      recognition.stop();
    }
  };


  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleAttachedFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleFileRemove = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      <div className="flex">
        <div className="flex flex-none justify-center items-center m-5">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }} // Hide the input field
            multiple // Allow multiple file selection
          />
          <button onClick={handleAttachedFile}>
            <FontAwesomeIcon 
              icon={faPaperclip}
              size="2xl"
              style={{ color: "#9ca3af" }}
            />
          </button>
        </div>
        <div className="flex-1 relative">
          {files.map((file, index) => (
            <div 
              key={index}
              className="inline-block relative mr-2 mt-2"
              style={{ width: "80px", height: "80px" }}
            >
              <FontAwesomeIcon
                icon={faTimesCircle}
                size="lg"
                style={{ color: "red", cursor: "pointer", position: "absolute", right: "0", top: "0", zIndex: "1" }}
                onClick={() => handleFileRemove(index)}
              />
              <img src={URL.createObjectURL(file)} alt={`file-${index}`} className="w-full h-full rounded-lg" />
            </div>
          ))}
          <input
            type="text"
            className="pl-14 pr-10 py-7 border rounded-lg w-full focus:outline-none border-none"
            placeholder="Type your message..."
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            value={message}
          />
        </div>
        <div className="flex flex-none justify-center items-center m-5 space-x-5">
          {isListening?(
            <button className=" hover:cursor-pointer"  onClick={handleMicrophone}>
              <FontAwesomeIcon icon={faMicrophone} size="2xl" style={{ color: "#f97316" }} />
            </button>
          ) : (
            <button className=" hover:cursor-pointer"  onClick={handleMicrophone}>
              <FontAwesomeIcon icon={faMicrophone} size="2xl" style={{ color: "#9ca3af" }} />
            </button>
          )}
          {message ? (
            <button className="hover: cursor-pointer" onClick={handleSendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} size="2xl" style={{ color: "#9ca3af" }} />
            </button>
          ) : (
            <button disabled className="hover: cursor-not-allowed">
              <FontAwesomeIcon icon={faPaperPlane} size="2xl" style={{ color: "#E5E5E5" }} />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
