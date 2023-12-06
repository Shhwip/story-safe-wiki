import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Discussion.css";
import Header from "../components/Header";


function Discussion() {
  const { title } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [ip, setIP] = useState("");

  useEffect(() => {
    const getIPAddress = async () => {
      const res = await axios.get("https://api.ipify.org/?format=json");
      console.log(res.data.ip);
      setIP(res.data.ip);
    };
    getIPAddress();
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/discussion/${title}`
        );
        setMessages(response.data);
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
    var username = localStorage.getItem("userSession");
    console.log(username);

    if (username === null) {
      username = ip.toString();
      console.log("entered if statement, username: " + username);
    }

    var date = new Date();
    setMessages([
      ...messages,
      {
        text: newMessage,
        user: username,
        timeStamp: date.toISOString(),
      },
    ]);
    await axios
      .post(`http://localhost:4000/discussion/${title}`, {
        text: newMessage,
        username: username ,
        timestamp: Date.now(),
        article: title,
      })
      .then((response) => {
        if (response.status === 201) {
          setNewMessage("");
        }
      })
      .catch((error) => console.log(error));

    console.log("end username: " + username);

    setNewMessage("");
  };

  const convertTimeToString = (timestamp) => {
    let dateString = "";
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    if (diff < 60000) {
      dateString = "Just now";
    } else if (diff < 3600000) {
      dateString = Math.floor(diff / 60000) + " min. ago";
    } else if (diff < 86400000) {
      dateString = Math.floor(diff / 3600000) + " hr. ago";
    } else if (diff < 2629800000) {
      if (diff < 172800000) {
        dateString = "Yesterday";
      } else dateString = Math.floor(diff / 86400000) + " days ago";
    } else if (diff < 31557600000) {
      dateString = Math.floor(diff / 2629800000) + " mo. ago";
    } else {
      dateString = Math.floor(diff / 31557600000) + " yr. ago";
    }
    return dateString;
  };

  return (
    <div>
      <Header />
      <div className="page-container">
        <h1 className="page-title">{title} Discussion</h1>
        <div className="message-container">
          {messages.map((message, index) => (
            <div className="message" key={index}>
              <div className="message-header">
                <div className="message-username">{message.user.username}</div>
                <div className="message-timestamp">
                  {convertTimeToString(message.timeStamp)}
                </div>
              </div>
              {message.text}
            </div>
          ))}
          <div className="block"></div>
        </div>
        <div className="input-container">
          <textarea
            type="text"
            value={newMessage}
            placeholder="Add a comment"
            onChange={handleNewMessageChange}
          />
          <div>
            <button onClick={handleSendMessage}>Send</button>
            {localStorage.getItem("userSession") ? (
              <div></div>
            ) : (
              <div className="warning-message">
                You are not logged in. Your IP address will be used to identify
                you.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discussion;
