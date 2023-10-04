import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from './pages/HomePage.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Parser from './components/Parser.jsx';


export const AppContext = createContext();


function App() {
  let [loggedInUser, setLoggedInUser] = useState([]);

  return (
      <AppContext.Provider value={{ loggedInUser }}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={ <HomePage /> } />
                  <Route path="/login" element={ <Login /> } />
                  <Route path="/register" element={ <Register /> } />
                  <Route path="/parse" element={ <Parser /> } />
              </Routes>
          </BrowserRouter>
      </AppContext.Provider>
  );
}

export default App;
