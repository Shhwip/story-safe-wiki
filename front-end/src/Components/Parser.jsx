import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";

function Parser() {
    const [displayMessage, setDisplayMessage] = useState(null);

    useEffect(() => {
        const getMessage = () => {
            axios.get(
                "http://localhost:4000/parse/"
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
        <div className="helloWorld">{displayMessage ? displayMessage : "null"}</div>
    );
}

export default Parser;
