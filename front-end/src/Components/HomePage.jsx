import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";

// Copying Josh's hello world
function HomePage() {
    const [displayMessage, setDisplayMessage] = useState(null);
    let [loggedInUser, setLoggedInUser] = useState([]);

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

    return (
        <div>{displayMessage ? displayMessage : "null"}</div>
    );
}

export default HomePage;
