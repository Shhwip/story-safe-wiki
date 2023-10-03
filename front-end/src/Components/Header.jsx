import React from 'react';
import './Header.css';
import logoHeader from '../assets/Horizontal Combination Mark.svg';
import user from '../Icons/person-circle-outline.svg'

function Header() {

    return (
        <header className="app-header">
            <img className="logo-header" src={logoHeader} alt="Combined Horizontal Logo for Story Safe"/>
            <nav className="navigation">
                <svg xmlns="http://www.w3.org/2000/svg" className="search-nav" viewBox="0 0 512 512" fill="#fff">
                    <path d="M256 64C150.13 64 64 150.13 64 256s86.13 192 192 192 192-86.13 192-192S361.87 64 256 64zm91.31 283.31a16 16 0 01-22.62 0l-42.84-42.83a88.08 88.08 0 1122.63-22.63l42.83 42.84a16 16 0 010 22.62z" />
                    <circle cx="232" cy="232" r="56"/>
                </svg>
                <button className="login">Sign In</button>
                <button className="register">
                    <img className="user-nav" src={user} alt="User Icon Circle Outline"></img>
                    Register
                </button>
            </nav>
        </header>
    );
}

export default Header;