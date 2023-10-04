import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";

function Parser() {
    const [displayMessage, setDisplayMessage] = useState(null);
    const DomParser = new DOMParser();
    const [doc, setDoc] = useState(null);
    useEffect(() => {
        const getMessage = () => {
            axios.get(
                "http://localhost:4000/parse/"
            ).then((response) => {
                setDoc(DomParser.parseFromString(response.data, "text/xml"));
                //response.data ? setDisplayMessage(response.data) : setDisplayMessage("empty");
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

    if (!doc) return <div>Loading...</div>;

    return (
        <div className="helloWorld">{doc}</div>
    );
}

export default Parser;
