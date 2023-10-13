import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Parser.css";
import parse from "html-react-parser";
import Header from "../components/Header.jsx";

function Parser() {
  const [displayMessage, setDisplayMessage] = useState(null);
  const [doc, setDoc] = useState(null);
  useEffect(() => {
    const getMessage = () => {
      axios
        .get("http://localhost:4000/parse/")
        .then(async (response) => {
          setDoc(response.data);
          //await setDoc(DomParser.parseFromString(response.data, "text/html"));
          console.log(doc);
          //response.data ? setDisplayMessage(response.data) : setDisplayMessage("empty");
          console.log("success");
        })
        .catch((error) => {
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
    <div>
          <base href="localhost"></base>
      {/* <Header /> */}
      <div className="ArticleParent">{parse(doc)}</div>
    </div>
  );
}

export default Parser;
