import React, { useEffect, useState} from "react";
import Header from "../components/Header.jsx";
import "./SearchPage.css";
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

    function truncateText(text, wordCount) {
        const words = text.split(' ');
        if (words.length <= wordCount) {
            return text;
        }
        const truncatedText = words.slice(0, wordCount).join(' ');
        return `${truncatedText}...`;
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
                            <div className="page-header">
                                <div className="page-header__title-wrapper">
                                    <h1 className="page-header__title">
                                        Search Results
                                    </h1>
                                </div>
                            </div>
                            <div className="page-content">
                                <div className="mw-body-content">
                                    <section className="unified-search">
                                        <form className="unified-search__form">
                                            <div className="unified-search__input">
                                                <div className="unified-search__input__wrapper__inner">
                                                    <div className="unified-search__input__wrapper">
                                                        <input className="unified-search__input__query" placeholder={query}/>
                                                    </div>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 512 512"
                                                        fill="#fff"
                                                        className="search-result-button"
                                                        //ref={selectRef}
                                                        //onClick={handleHeaderSearchClick}
                                                    >
                                                        <path d="M256 64C150.13 64 64 150.13 64 256s86.13 192 192 192 192-86.13 192-192S361.87 64 256 64zm91.31 283.31a16 16 0 01-22.62 0l-42.84-42.83a88.08 88.08 0 1122.63-22.63l42.83 42.84a16 16 0 010 22.62z" />
                                                        <circle cx="232" cy="232" r="56" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </form>

                                        <div className="unified-search__layout">
                                            <div className="unified-search__layout__main">
                                                <p className="unified-search__results__count">
                                                    About {searchResults.length} result
                                                    {searchResults.length !== 1 ? 's' : ''} for{' '}
                                                    <strong>"{query}"</strong>
                                                </p>

                                                {isLoading ? (
                                                    <p>Loading...</p>
                                                ) : (
                                                    <div>
                                                        {searchResults.length === 0 ? (
                                                            <p></p>
                                                        ) : (
                                                            <ul className="unified-search__results">
                                                                {searchResults.map((result) => (
                                                                    <li className="unified-search__result" key={result._id.toString()}>
                                                                        <article>
                                                                            <h3 className="unified-search__result__header">
                                                                                <a className="unified-search__result__title"
                                                                                   href={`/parse/${encodeURIComponent(result.title)}`}>
                                                                                    {result.title}
                                                                                </a>
                                                                            </h3>
                                                                            <div className="unified-search__result__content">
                                                                                {truncateText(result.text, 30)}
                                                                            </div>
                                                                        </article>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
