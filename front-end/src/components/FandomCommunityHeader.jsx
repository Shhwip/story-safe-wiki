import React from "react";
import wormLogoHeader from "../assets/worm-logo.png";

function FandomCommunityHeader() {

    return(
        <header className="fandom-community-header">
            <a className="fandom-community-header__image" href="#">
                <img src={wormLogoHeader}
                     width="225" height="65" alt="Worm Wiki">
                </img>
            </a>
            <div className="fandom-community-header__top-container">
                <div className="fandom-community-header__community-name-wrapper">
                    <a className="fandom-community-header__community-name" href="/">
                        Worm Wiki
                    </a>
                </div>
            </div>
            <nav className="fandom-community-header__local-navigation">
                <ul className="wds-tabs">
                    <li className="wds-dropdown explore-menu">
                        <a href="/random">
                            <span>Random</span>
                        </a>
                    </li>
                    <li className="wds-dropdown">
                        <a href="https://github.com/Shhwip/story-safe-wiki">
                            <span>Source Code</span>
                        </a>
                    </li>
                    <li className="wds-dropdown">
                        <a href="#">
                            <span>Discussion</span>
                        </a>
                    </li>

                </ul>
            </nav>
        </header>
    )
}

export default FandomCommunityHeader;