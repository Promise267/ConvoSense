import React, { useMemo, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faVolumeHigh } from '@fortawesome/free-solid-svg-icons';

export default function Message({ messages, userId, chatModelId, socket }) {

  const speakMessage = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <ScrollToBottom className="scrollable-div">
      {messages.map((message, index) => {
        const isSentByUser = message.sender && message.sender._id === userId;
        const messageClass = isSentByUser ? 'text-right' : 'text-left';
        const backgroundColor = isSentByUser ? 'bg-customGradient text-white' : 'bg-orange-500 text-gray-800';

        // Parse createdAt timestamp
        const createdAt = new Date(message.createdAt);
        const time = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const day = createdAt.toLocaleDateString(undefined, { weekday: 'short' });

        return (
          <div key={index} className={`p-2 ${messageClass}`}>
            <div className={`inline-block ${backgroundColor} px-3 py-2 rounded-md`}>
              <div className="flex flex-row space-x-4">
                <div>
                  {message.content}
                </div>
                <div>
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-600">
              <div>
                {day}, {time} &nbsp;
                  <button onClick={() => speakMessage(message.content)}>
                    <FontAwesomeIcon icon={faVolumeHigh} />
                  </button>
              </div>
            </div>
          </div>
        );
      })}
    </ScrollToBottom>
  );
}
