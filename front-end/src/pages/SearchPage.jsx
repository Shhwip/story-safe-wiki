import React, { useEffect, useState} from "react";
import Header from "../components/Header.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import FandomCommunityHeader from "../components/FandomCommunityHeader.jsx";

function SearchPage() {
    const { query } = useParams(); // Retrieve the search query from the URL
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    console.log("SearchPage rendered");

    useEffect(() => {
        // Make an axios GET request to your backend's /bigSearch route
        console.log(query);
        setIsLoading(true);

        axios
            .get(`http://localhost:4000/search/bigSearch?q=${query}`)
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    setSearchResults(response.data);
                } else {
                    setSearchResults([]);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error searching:", error);
                setIsLoading(false);
            });
    }, [query]);

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
                            <div className="page-header">
                                <div className="page-header__title-wrapper">
                                    <h1 className="page-header__title">
                                        Search Page
                                    </h1>
                                </div>
                            </div>
                            <div>
                                {isLoading ? (
                                    <p>Loading...</p>
                                ) : (
                                    <div>
                                        {searchResults.length === 0 ? (
                                            <p>No search results found</p>
                                        ) : (
                                            <ul>
                                                {searchResults.map((result) => (
                                                    <li key={result._id.toString()}>{result.title}</li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
