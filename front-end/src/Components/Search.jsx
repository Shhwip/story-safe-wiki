import React, {useEffect, useRef} from 'react';
import './Search.css';

function Search({ onCloseSearch }) {

function handleCloseSearchClick() {
    // setIsPopupActive to false in Header.jsx
    onCloseSearch();
}

    return (
        <div className="search-background">
            <div className="search-container">
                <div className="search-input-box">
                    <input
                        className="search-input-box"
                        type="text"
                        placeholder="Search..."
                    />
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff"
                     className="search-bar-icon">
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
        </div>
    );
}

export default Search;