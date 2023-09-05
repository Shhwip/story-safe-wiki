import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [displayMessage, setDisplayMessage] = useState(null);

  useEffect(() => {
    const getMessage = () => {
        axios.get(
          "http://localhost:4000/helloWorld/"
        ).then((response) => {
          response.data ? setDisplayMessage(response.data) : setDisplayMessage("empty");
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

  return <div>{displayMessage ? displayMessage : "null"}</div>

}

export default App;
