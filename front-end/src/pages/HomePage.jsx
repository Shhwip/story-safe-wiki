import React from "react";
import { useState, useEffect } from "react";
import "./HomePage.css";
import axios from "axios";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";

// Copying Josh's hello world
function HomePage() {
  const [displayMessage, setDisplayMessage] = useState(null);
  let [loggedInUser, setLoggedInUser] = useState([]);
  const navigate = useNavigate();

  function handleToParserClick() {
    navigate("/w/Lung");
  }

  return (
    <div>
      <Header />
      <div className="other">
        <button className="parser-button" onClick={handleToParserClick}>
          To Parser
        </button>
      </div>
    </div>
  );
}

export default HomePage;
