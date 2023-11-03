import React, {useEffect, useRef, useState} from 'react';
import './Header.css';
import logoHeader from '../assets/Horizontal Combination Mark.svg';
import user from '../icons/person-circle-outline.svg';
import {useNavigate} from "react-router-dom";
import Search from './Search.jsx'
import SearchPage from "../pages/SearchPage.jsx";

function Header() {
const navigate = useNavigate();
const [isPopupActive, setIsPopupActive] = useState(false);
const selectRef = useRef(null);
const [prevScrollPos, setPrevScrollPos] = useState(0);
const [visible, setVisible] = useState(true);

  function handleHeaderHomeClick() {
    navigate("/");
  }
  function handleHeaderLoginClick() {
    navigate("/login");
  }

  function handleHeaderRegisterClick() {
    navigate("/register");
  }

  function handleHeaderSearchClick() {
    setIsPopupActive(true);
  }

  function handleCloseSearch() {
    setIsPopupActive(false);
  }

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            if (currentScrollPos > prevScrollPos) {
                // scrolling down
                setVisible(false);
            } else {
                // scrolling up
                setVisible(true);
            }

            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            // clean event on unmount
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

  return (
    <div>
      <header className={`app-header ${visible ? 'visible' : 'hidden'}`}>
        <img className="logo-header"
              src={logoHeader}
              alt="Combined Horizontal Logo for Story Safe"
              onClick={handleHeaderHomeClick}
        />
        <nav className="navigation">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="#fff"
            className={`search-nav ${isPopupActive ? "active" : ""}`}
            ref={selectRef}
            onClick={handleHeaderSearchClick}
          >
            <path d="M256 64C150.13 64 64 150.13 64 256s86.13 192 192 192 192-86.13 192-192S361.87 64 256 64zm91.31 283.31a16 16 0 01-22.62 0l-42.84-42.83a88.08 88.08 0 1122.63-22.63l42.83 42.84a16 16 0 010 22.62z" />
            <circle cx="232" cy="232" r="56" />
          </svg>
          {localStorage.getItem("userSession") ? (
            <div className="header-button-container">
              <button
                className="logout"
                onClick={() => {
                  localStorage.removeItem("userSession");
                  navigate("/");
                }}
              >
                Logout
              </button>
              <button className="account-button">
                  {localStorage.getItem("userSession")}
              </button>
            </div>
          ) : (
            <div className="header-button-container">
              <button className="login"
                      onClick={handleHeaderLoginClick}
              >
                Sign In
              </button>
              <button className="register"
                      onClick={handleHeaderRegisterClick}
              >
                <img
                  className="user-nav"
                  src={user}
                  alt="User Icon Circle Outline"
                >
                </img>
                Register
              </button>
            </div>
          )}
        </nav>
      </header>
        {isPopupActive && <Search onCloseSearch={handleCloseSearch} />}
    </div>
  );
}

export default Header;
