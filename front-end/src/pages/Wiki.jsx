import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Wiki.css";
import parse from "html-react-parser";
import Header from "../components/Header.jsx";
import FandomCommunityHeader from "../components/FandomCommunityHeader.jsx";

function Wiki() {
    const [doc, setDoc] = useState(null);
    const [notFound, setNotFound] = useState(false); // [notFound, setNotFound
    const { title } = useParams();
    const navigate = useNavigate();

  const handleEditButtonClick = () => {
    navigate("/edit/" + title);
  };

  const handleDiscussButtonClick = () => {
    navigate("/discussion/" + title);
  };

    const handleCreateButtonClick = () => {
        navigate("/create/" + title);
    };
    // put this back if there is a problem with the below useEffect
    // useEffect(() => {
    // const getMessage = () => {
    //   axios
    //     .get("http://localhost:4000/w/" + title)
    //     .then(async (response) => {
    //       setDoc(response.data);
    //       console.log("success");
    //     })
    //     .catch((error) => {
    //       console.log("error1: ");
    //       console.log(error);
    //       return(<h1>404 Not Found</h1>);
    //     });
    // };
    // getMessage();
    // }, []);


    // Refresh page when searching
    useEffect(() => {
        setDoc(null);
        const getMessage = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/w/${title}`);
                setDoc(response.data);
                console.log("success");
            } catch (error) {
                console.log("error2: ");
                console.log(error);
                setNotFound(true);
            }
        };
        getMessage();
    }, [title]);
    
    if (notFound) {
        return (
            <div>
                <h1>article {title} not found</h1>
                <p>Would you like to create it?</p>
                <button onClick={handleCreateButtonClick}>Create</button>
            </div>
        );
    }


    
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
      <div className="global-navigation">{<Header />}</div>
      <div className="main-container">
        <div className="resizable-container">
          <div className="community-header-wrapper">
            <FandomCommunityHeader />
          </div>
          <div className="page">
            <main className="page__main" lang="en">
              <div className="page-side-tools__wrapper">
                <div className="page-side-tools">
                  <button
                    className="page-side-tool"
                    onClick={handleEditButtonClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ionicon ionicon-small"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M384 224v184a40 40 0 01-40 40H104a40 40 0 01-40-40V168a40 40 0 0140-40h167.48"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="32"
                      />
                      <path d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z" />
                    </svg>
                  </button>
                  <button
                    className="page-side-tool"
                    onClick={handleDiscussButtonClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="ionicon ionicon-small"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
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
