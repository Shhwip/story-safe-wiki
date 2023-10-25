import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import Parser from "./pages/Parser.jsx";

export const AppContext = createContext();

function App() {
  let [loggedInUser, setLoggedInUser] = useState([]);

  return (
    <AppContext.Provider value={{ loggedInUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/parse/:title" element={<Parser />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
