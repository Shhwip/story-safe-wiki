import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from './Components/HomePage.jsx';


export const AppContext = createContext();


function App() {
  let [loggedInUser, setLoggedInUser] = useState([]);

  return (
      <AppContext.Provider value={{ loggedInUser }}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={ <HomePage /> } />
              </Routes>
          </BrowserRouter>
      </AppContext.Provider>
  );
}

export default App;
