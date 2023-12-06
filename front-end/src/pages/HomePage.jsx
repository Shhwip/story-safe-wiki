import React from "react";
import "./HomePage.css";
import Header from "../components/Header.jsx";
import FandomCommunityHeader from "../components/FandomCommunityHeader.jsx";
import {Link} from "react-router-dom";
import Taylor from "../assets/Taylor.jpeg";
import Lung from "../assets/Lung.jpeg";
import SearchHome from "../components/SearchHome.jsx";

function HomePage() {

  return (
    <div>
      <Header />
      <div className="main-container">
        <div className="resizable-container">
          <SearchHome/>
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
                  <p>
                    Welcome to the ultimate hub for fans of the "Worm" series! Our unique Story Safe feature lets you
                    control spoilers based on how far you've read. Simply choose your current progress in the series,
                    and our site will blur out any spoilers beyond that point. There are 30 arcs in the series, with
                    author comments marked as Arc 31.
                  </p>

                  <p>
                    A Note on Spoilers: We're still in the process of tagging spoilers throughout the site, so please
                    browse carefully if you haven't finished the series.
                  </p>

                  <h2>How to Set Your Spoiler Level</h2>
                  <p>
                    1. Select Your Progress: Find the dropdown menu in the page header.
                  </p>

                  <p>
                    2. Choose Your Arc: Select the arc you're currently reading. We cover all 30 arcs, plus author
                    comments.
                  </p>

                  <p>
                    3. Enjoy a Spoiler-Free Experience: The site automatically blurs content beyond your selected arc.
                  </p>


                  <h2>Help Us Tag Spoilers</h2>
                  <p>
                    If you're well-versed in the "Worm" universe, you can contribute by tagging spoilers. It's easy:
                  </p>
                  <p>
                    1. Enter the Editor: Start editing any article.
                  </p>

                  <p>
                    2. Tag Spoilers: Wrap the spoiler text in an &lt;em&gt; tag with the appropriate class. For
                    example, for a spoiler in Arc 1, use &lt;em className="spoil_1"&gt;Your spoiler text here&lt;/em&gt;.
                  </p>

                  <p>
                    3. Stick to Whole Numbers: If a spoiler is from Arc 2.3, tag it as Arc 2.
                  </p>

                  <h2>Change Your Spoiler Level Anytime</h2>
                  <p>You can adjust your spoiler level whenever you like, even without an account. Just revisit the
                    selector menu at the top and select a new arc.</p>

                  <h2>Explore Featured Articles</h2>
                  <p>
                    Dive deeper into the world of "Worm" with our featured articles. Click on the images below to
                    learn more about characters like Taylor Hebert and Lung.
                  </p>
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
