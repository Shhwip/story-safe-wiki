import { useState, createContext } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.css";
import Edit from './pages/Edit.jsx';
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import Wiki from "./pages/Wiki.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import Discussion from "./pages/Discussion.jsx";
import History from "./pages/History.jsx";

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
          <Route path="/edit/:title" element={<Edit />} />
          <Route path="/w/:title" element={<Wiki />} />
          <Route path="/search/:query" element={<SearchPage />} />
          <Route path="/discussion/:title" element={<Discussion />} />
          <Route path="/h/:title" element={<History />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
