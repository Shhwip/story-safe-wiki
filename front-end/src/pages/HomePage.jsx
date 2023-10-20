import React from 'react';
import { useState, useEffect } from 'react';
import './HomePage.css';
import axios from "axios";
import Header from "../components/Header.jsx";
import {useNavigate} from "react-router-dom";

// Copying Josh's hello world
function HomePage() {
    const [displayMessage, setDisplayMessage] = useState(null);
    let [loggedInUser, setLoggedInUser] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getMessage = () => {
            axios.get(
                "http://localhost:4000/helloWorld/"
            ).then((response) => {
                response.data ? setDisplayMessage(response.data) : setDisplayMessage("empty");
                console.log("success")
            }).catch((error) => {
                console.log("error: ");
                console.log(error);
            });
        };
        getMessage();
        console.log("displayMessage: ");
        console.log(displayMessage);
    }, []);

    if (!displayMessage) return <div>Loading...</div>;


    function handleToParserClick() {
        navigate("/parse");
    }

    return (
        <div>
            <Header />
            <div className="other">
                <button className="parser-button" onClick={handleToParserClick}>To Parser</button>
            </div>
        </div>
    );
}

export default HomePage;
