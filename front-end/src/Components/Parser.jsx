import React from 'react';
import { useState, useEffect } from 'react';
import axios from "axios";
import parse from 'html-react-parser';

function Parser() {
    const [displayMessage, setDisplayMessage] = useState(null);
    const DomParser = new DOMParser();
    var docString = "";
    const [doc, setDoc] = useState(null);
    useEffect(() => {
        const getMessage = () => {
            axios.get(
                "http://localhost:4000/parse/"
            ).then(async (response) => {
                setDoc(response.data);
                //await setDoc(DomParser.parseFromString(response.data, "text/html"));
                console.log(doc)
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

    function displayDoc() {
        console.log(doc)
        return Object.keys(doc).map(function(key) {
          return <div key={key}>Key: {key}, Value: {doc[key]}</div>;
        });
      }

    if (!doc) return <div>Loading...</div>;

    return (
        <div>{parse(doc)}</div>
    );
}

export default Parser;
