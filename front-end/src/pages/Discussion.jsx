import React, { useState } from 'react';
import './Discussion.css';

function Discussion() {
  const [messages, setMessages] = useState([{ message: 'Hello', username: 'username', timestamp: '11/7/2023T5:55:00PM' }, { message: 'World', username: 'username', timestamp: '11/7/2023T5:58:00PM' }]);
  const [newMessage, setNewMessage] = useState('');

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    setMessages([...messages, newMessage]);
    setNewMessage('');
  };

  return (
    <div>
      <h1>Chat</h1>
      <div className='message-container'>
        {messages.map((message, index) => (
          <div className='message' key={index}>{message.message}</div>
        ))}
      </div>
      <div className='input-container'>
        <input type="text" value={newMessage} onChange={handleNewMessageChange} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Discussion;
