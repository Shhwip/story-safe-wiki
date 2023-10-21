import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Parser.css";
import parse from "html-react-parser";
import Header from "../components/Header.jsx";
import wormLogoHeader from "../assets/worm-logo.png";

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
        <div className="global-navigation">
            { <Header /> }
        </div>
        <div className="main-container">
            <div className="resizable-container">
                <div className="community-header-wrapper">
                    <header className="fandom-community-header">
                        <a className="fandom-community-header__image" href="#">
                            <img src={wormLogoHeader}
                                 width="225" height="65" alt="Worm Wiki">
                            </img>
                        </a>
                        <div className="fandom-community-header__top-container">
                            <div className="fandom-community-header__community-name-wrapper">
                                <a className="fandom-community-header__community-name" href="#">
                                    Worm Wiki
                                </a>
                            </div>
                        </div>
                        <nav className="fandom-community-header__local-navigation">
                            <ul className="wds-tabs">
                                <li className="wds-dropdown explore-menu">
                                    <a href="#">
                                        <span>Explore</span>
                                    </a>
                                </li>
                                <li className="wds-dropdown">
                                    <a href="#">
                                        <span>Help Out</span>
                                    </a>
                                </li>
                                <li className="wds-dropdown">
                                    <a href="#">
                                        <span>Top Articles</span>
                                    </a>
                                </li>
                                <li className="wds-dropdown">
                                    <a href="#">
                                        <span>Community</span>
                                    </a>
                                </li>

                            </ul>
                        </nav>
                    </header>
                </div>
                <div className="page">
                    <main className="page__main" lang="en">
                        {parse(doc)}
                    </main>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Parser;
