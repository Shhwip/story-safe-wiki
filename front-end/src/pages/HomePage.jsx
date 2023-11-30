import React from "react";
import "./HomePage.css";
import Header from "../components/Header.jsx";
import FandomCommunityHeader from "../components/FandomCommunityHeader.jsx";
import {Link} from "react-router-dom";
import Taylor from "../assets/Taylor.jpeg";
import Lung from "../assets/Lung.jpeg";

function HomePage() {

  return (
    <div>
      <Header />
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
                    Home
                  </h1>
                </div>
              </div>
              <div className="page-content">
                <div className="mw-body-content">
                  <h2>Welcome to the Parahumans Wiki on Story Safe</h2>
                  <p>On Story Safe users are able to select how much they know of a story and if the article has been
                  spoiler tagged then, that section of text is blurred out. On the header of the page you can select at
                  what arc of the Worm series you are at and Story Safe will do the rest. There are 30 arcs and author
                  comments are marked as arc 31.</p>

                  <p>Note: Not every article is spoiler tagged as of yet, so proceed with caution.</p>

                  <h2>Editing Spoil Instructions</h2>
                  <p>If you know the content well you can help with adding the spoiler tags to content. Once you enter
                  into the editor you can surround text with an "em" tag and then add the spoil level like this:
                    &lt;em className=spoil_1&gt;Spoiler text surrounded by spoil tag&lt;/em&gt; The site will then
                  handle the rest. If an arc is 2.3 then put the spoil level as 2, as we only accept whole numbers.</p>

                  <h2>Spoiler Level</h2>
                  <p>You can change your spoiler level at any time and you don't need to be logged in for it to work.</p>

                  <div className="page-header">
                    <div className="page-header__title-wrapper">
                      <h1 className="page-header__title">
                        Featured Articles
                      </h1>
                    </div>
                  </div>

                  <div className="articles">
                    <Link to="/w/Taylor%20Hebert">
                      <div className="article-container">
                        <div className="article-image-container">
                          <img className="article-image" src={Taylor} alt="Taylor Image"/>
                        </div>
                        <div className="article-title">
                          Taylor Hebert
                        </div>
                      </div>
                    </Link>

                    <Link to="/w/Lung">
                      <div className="article-container">
                        <div className="article-image-container">
                          <img className="article-image" src={Lung} alt="Lung Image"/>
                        </div>
                        <div className="article-title">
                          Lung
                        </div>
                      </div>
                    </Link>
                  </div>

                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
