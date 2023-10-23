import React, {useEffect, useRef, useState} from 'react';
import './Search.css';
import axios from "axios";

function Search({ onCloseSearch }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);

    function handleCloseSearchClick() {
        // setIsPopupActive to false in Header.jsx
        onCloseSearch();
    }

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.get(`http://localhost:4000/search?q=${searchQuery}`);

            if (response.data && response.data.length > 0) {
                setSearchResults(response.data);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error searching:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearchSubmit(event);
        }
    }


    return (
        <div className="search-background">
            <div className="search-container">
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        onKeyDown={handleKeyDown}
                        ref={inputRef}
                    />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"
                     className="search-bar-icon"
                     onClick={handleSearchSubmit}>
                    <path d="M256 64C150.13 64 64 150.13 64 256s86.13 192 192 192 192-86.13 192-192S361.87 64 256 64zm91.31 283.31a16 16 0 01-22.62 0l-42.84-42.83a88.08 88.08 0 1122.63-22.63l42.83 42.84a16 16 0 010 22.62z" />
                    <circle cx="232" cy="232" r="56"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"
                     className="search-bar-icon close"
                     onClick={handleCloseSearchClick}>
                    <path
                        d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm75.31 260.69a16 16 0 11-22.62 22.62L256 278.63l-52.69 52.68a16 16 0 01-22.62-22.62L233.37 256l-52.68-52.69a16 16 0 0122.62-22.62L256 233.37l52.69-52.68a16 16 0 0122.62 22.62L278.63 256z"/>
                </svg>
            </div>
            {isLoading ? (
                <p className="search-results">Loading...</p>
            ) : (
                <div className="search-results">
                    {searchResults.length > 0 ? (
                        <ul>
                            {searchResults.map((result) => (
                                <li key={result._id}>{result.title}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No search results found</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Search;