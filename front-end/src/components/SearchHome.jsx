import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";
import axios from "axios";

function SearchHome({ onCloseSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.get(`/api/search?q=${searchQuery}`);

      if (response.data && response.data.length === 1) {
        setSearchResults(response.data);
        const title = response.data[0].title;
        const encodedTitle = encodeURIComponent(title);
        navigate(`/w/${encodedTitle}`);
      } else {
        // go to search page
        navigate(`/search/${searchQuery}`);
        setSearchResults([]);
        console.log("Search found no exact matches.");
      }
      onCloseSearch();
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchSubmit(event);
    }
  };

  return (
    <>
      <div className="search-container home">
        <div className="search-input-box">
          <input
            className="search-input-box"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            autoFocus
          />
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="#fff"
          className="search-bar-icon"
          onClick={handleSearchSubmit}
        >
          <path d="M256 64C150.13 64 64 150.13 64 256s86.13 192 192 192 192-86.13 192-192S361.87 64 256 64zm91.31 283.31a16 16 0 01-22.62 0l-42.84-42.83a88.08 88.08 0 1122.63-22.63l42.83 42.84a16 16 0 010 22.62z" />
          <circle cx="232" cy="232" r="56" />
        </svg>
      </div>
      {isLoading ? (
        <p className="search-results">Searching...</p>
      ) : (
        <div className="search-results">
          {searchResults.length === 0 ? (
            <p></p>
          ) : (
            <ul>
              {searchResults.map((result) => (
                <li key={result._id}>{result.title}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export default SearchHome;
