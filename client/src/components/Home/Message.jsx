import React from 'react';

export default function Message({ messages, userId, chatModelId }) {
  return (
    <div className="scrollable-div">
      {messages.map((message, index) => {
        const isSentByUser = message.sender && message.sender._id === userId;
        const messageClass = isSentByUser ? 'text-right' : 'text-left';
        const backgroundColor = isSentByUser ? 'bg-customGradient text-white' : 'bg-gray-300';

        // Parse createdAt timestamp
        const createdAt = new Date(message.createdAt);
        const time = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const day = createdAt.toLocaleDateString(undefined, { weekday: 'short' });

        return (
          <div key={index} className={`p-4 ${messageClass}`}>
            <div className={`inline-block ${backgroundColor} px-7 py-2 rounded-md`}>
              <div>
                {message.content}
              </div>
            </div>
            <div className="text-xs">
              {day}, {time}
            </div>
          </div>
        );
      })}
    </div>
  );
}
