import React from "react";
import { useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Wiki.css";
import parse from "html-react-parser";
import Header from "../components/Header.jsx";
import FandomCommunityHeader from "../components/FandomCommunityHeader.jsx";

function Wiki() {
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
    
    
    if (!doc) {
        // While loading or if there's an error, display the message
        return (
            <div>
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
        <div className="global-navigation">
            { <Header /> }
        </div>
        <div className="main-container">
            <div className="resizable-container">
                <div className="community-header-wrapper">
                    <FandomCommunityHeader />
                </div>
                <div className="page">
                    <main className="page__main" lang="en">
                        <div className="page-side-tools__wrapper">
                            <div className="page-side-tools">
                                <button className="page-side-tool" onClick={handleEditButtonClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon ionicon-small"
                                         viewBox="0 0 512 512">
                                        <path
                                            d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48"
                                            fill="none" stroke="currentColor" stroke-linecap="round"
                                            stroke-linejoin="round" stroke-width="32"/>
                                        <path
                                            d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z"/>
                                    </svg>
                            </button>
                            </div>
                        </div>

                        {parse(doc)}
                    </main>
                </div>
              </div>
          </div>
        </div>
  );
}

export default Wiki;
