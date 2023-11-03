import React from "react";
import { useState, useEffect } from "react";
import "./HomePage.css";
import axios from "axios";
import Header from "../components/Header.jsx";
import { useNavigate } from "react-router-dom";

function HomePage() {

  function handleToParserClick() {
    navigate("/w/Lung");
  }

  return (
    <div>
      <Header />
    </div>
  );
}

export default HomePage;
