import React from "react";
import { useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Parser.css";
import parse from "html-react-parser";
import Header from "../components/Header.jsx";
import FandomCommunityHeader from "../components/FandomCommunityHeader.jsx";

function Parser() {
    //const [displayMessage, setDisplayMessage] = useState("loading...");
    const [doc, setDoc] = useState(null);
    const { title } = useParams();
    const navigate = useNavigate();

    const handleEditButtonClick = () => {
    navigate("/edit/" + title);
    };

    // gets main body text
    useEffect(() => {
    const getMessage = () => {
      axios
        .get("http://localhost:4000/w/" + title)
        .then(async (response) => {
          setDoc(response.data);
          console.log("success");
        })
        .catch((error) => {
          console.log("error: ");
          console.log(error);
        });
    };
    getMessage();
    }, []);


    // Refresh page when searching
    useEffect(() => {
        setDoc(null);
        const getMessage = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/w/${title}`);
                setDoc(response.data);
                console.log("success");
            } catch (error) {
                console.log("error: ");
                console.log(error);
            }
        };
        getMessage();
    }, [title]);

    // possibly set doc to null when searching
    
    if (!doc) {
        // While loading or if there's an error, display the message
        return (
            <div>
                <base href="localhost"></base>
                <div className="global-navigation">
                    <Header/>
                </div>
                <div className="main-container">
                    <div className="resizable-container">
                        <div className="community-header-wrapper">
                            <FandomCommunityHeader/>
                        </div>
                        <div className="page">
                            <main className="page__main" lang="en">
                                <div className="page-header">
                                    <div className="page-header__title-wrapper">
                                        <h1 className="page-header__title">
                                            <span className="loading-text">
                                                  {'Loading...'.split('').map((letter, index) => (
                                                      <span key={index} style={{'--index': index}}>
                                                          {letter}
                                                        </span>
                                                  ))}
                                            </span>
                                        </h1>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

  return (
    <div>
        <base href="localhost"></base>
        <div className="global-navigation">
            { <Header /> }
        </div>
        <div className="main-container">
            <div className="resizable-container">
                <div className="community-header-wrapper">
                    <FandomCommunityHeader />
                </div>
                <div className="page">
                    <button className="edit-button" onClick={handleEditButtonClick}>
                        edit
                    </button>
                    {parse(doc)}
                </div>
              </div>
          </div>
        </div>
  );
}

export default Parser;
