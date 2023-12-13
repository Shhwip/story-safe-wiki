import React, { useEffect, useRef, useState } from "react";
import "./Header.css";
import user from "../icons/person-circle-outline.svg";
import logoHeader from "../assets/Vertical_Combination_Mark.svg";
import { useNavigate } from "react-router-dom";
import Search from "./Search.jsx";
import AccountMenu from "./AccountMenu";
import axios from "axios";

function MobileHeader() {
    const navigate = useNavigate();
    const [isPopupActive, setIsPopupActive] = useState(false);
    const selectRef = useRef(null);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [spoilerLevel, setSpoilerLevel] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const maxNumberOfArcs = 31;
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    useEffect(() => {
        const storedSpoilerLevel = localStorage.getItem("noSpoilLevel");

        if (storedSpoilerLevel != null) {
            setSpoilerLevel(parseInt(storedSpoilerLevel, 10));
        }
    }, []);


    const handleSaveSpoilerLevel = () => {
        if (spoilerLevel < 0 || spoilerLevel > maxNumberOfArcs) {
            setErrorMessage("Number must be between 0 and 30");
            return;
        }
        setErrorMessage("");
        localStorage.setItem("noSpoilLevel", spoilerLevel);

        // Reload the page to apply the new spoiler level
        window.location.reload();
    };

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

    const handleLogOut = async () => {
        localStorage.removeItem("userSession");
        navigate("/");
        try {
            await axios.post("/user/logout");
        } catch (error) {
            console.log(error);
        }
    };

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

        window.addEventListener("scroll", handleScroll);

        return () => {
            // clean event on unmount
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollPos]);

    return (
        <>
            <header className={`app-header ${visible ? "visible" : "hidden"}`}>
                <img
                    className="logo-header"
                    src={logoHeader}
                    alt="Combined Vertical Logo for Story Safe"
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

                    <div className="menu-icon-wrapper" onClick={toggleMenu}>
                        <div className="line-horizontal _01"></div>
                        <div className="line-horizontal _02"></div>
                    </div>
                </nav>
                <div className={`mobile-menu ${menuOpen ? 'menu-open' : ''}`}>
                    <div className="mobile-menu-header">
                        <div className="menu-icon-wrapper" onClick={toggleMenu}>
                            <div className="line-horizontal _03"></div>
                            <div className="line-horizontal _04"></div>
                        </div>
                    </div>

                    <nav className="innermenu container relative">
                        <div className="spoil-level__header">
                            <span className="spoil-level__text">Spoiler Level:</span>
                            <input
                                className="spoil-level__input"
                                type="number"
                                min={0}
                                max={maxNumberOfArcs}
                                value={spoilerLevel}
                                onChange={(e) => setSpoilerLevel(e.target.value)}
                            >
                            </input>
                            {errorMessage ? (
                                <div className="side-bar-error-message">{errorMessage}</div>
                            ) : (
                                <></>
                            )}
                            <div
                                className="spoil-level__save"
                                onClick={handleSaveSpoilerLevel}
                            >
                                Save
                            </div>
                        </div>

                        {localStorage.getItem("userSession") ? (
                            <div className="header-button-container">
                                <button className="logout" onClick={handleLogOut}>
                                    Logout
                                </button>
                                <AccountMenu handleLogOut={handleLogOut} />
                            </div>
                        ) : (
                            <div className="header-button-container">
                                <button className="login" onClick={handleHeaderLoginClick}>
                                    Sign In
                                </button>
                                <button className="register" onClick={handleHeaderRegisterClick}>
                                    <img
                                        className="user-nav"
                                        src={user}
                                        alt="User Icon Circle Outline"
                                    ></img>
                                    Register
                                </button>
                            </div>
                        )}
                    </nav>
                </div>
            </header>
            {isPopupActive && <Search onCloseSearch={handleCloseSearch} />}
        </>
    );
}

export default MobileHeader;