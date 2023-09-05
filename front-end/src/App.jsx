import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [displayMessage, setDisplayMessage] = useState(null);

  useEffect(() => {
    const getMessage = () => {
      try {
        let { data } = axios.get("http://localhost:4000/helloWorld/");
        setDisplayMessage(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getMessage;
    console.log(displayMessage);
  }, []);

  return <div>Hello World!</div>
  //<div>{displayMessage}</div>

}

export default App;
