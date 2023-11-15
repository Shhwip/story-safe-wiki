import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Discussion.css';

function Discussion() {
  const { title } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/discussion/${title}`);
        console.log(response.data)
        setMessages(response.data);
        console.log("success");
      } catch (error) {
        console.log("error: ");
        console.log(error);
      }
    };
    getMessages();
  }, []);


  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    setMessages([...messages, { message: newMessage, username: localStorage.getItem("userSession"), timestamp: Date.now() }]);
    await axios.post(`http://localhost:4000/discussion/${title}`, {
      text: newMessage,
      username: localStorage.getItem("userSession"),
      timestamp: Date.now(),
      article: title
    });

    setNewMessage('');
  };

  const convertTimeToString = (timestamp) => {
    console.log(timestamp)
    let dateString = '';
    const date = new Date(timestamp);
    console.log(date);
    const now = new Date();
    const diff = now - date;
    if (diff < 60000) {
      dateString = 'Just now';
    }
    else if (diff < 3600000) {
      dateString = Math.floor(diff / 60000) + ' min. ago';
    }
    else if (diff < 86400000) {
      dateString = Math.floor(diff / 3600000) + ' hr. ago';
    }
    else if (diff < 604800000) {
      if (diff < 172800000) {
        dateString = 'Yesterday';
      }
      else 
        dateString = Math.floor(diff / 86400000) + ' days ago';
    }
    else if (diff < 31557600000) {
      dateString = Math.floor(diff / 2629800000) + ' mo. ago';
    }
    else {
      dateString = Math.floor(diff / 31557600000) + ' yr. ago';
    }
    return dateString;
  }

  return (
    <div>
      <h1>{title} Discussion</h1>
      <div className='message-container'>
        {messages.map((message, index) => (
          <div className='message' key={index}>
            <div className='message-header'>
              <div className='message-username'>{message.user}</div>
              <div className='message-timestamp'>{convertTimeToString(message.timestamp)}</div>
            </div>
            {message.message}
          </div>
        ))}
      </div>
      <div className='input-container'>
        <textarea type="text" value={newMessage}  placeholder='Add a comment' onChange={handleNewMessageChange} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Discussion;
