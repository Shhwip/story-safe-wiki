import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import "./AccountMenu.css";

export default function AccountMenu({ handleLogOut }) {
  const [sideBar, setSideBar] = useState(false);
  const [showSpoilLevel, setShowSpoilLevel] = useState(false);
  const [spoilerLevel, setSpoilerLevel] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const sideBarElement = useRef();

  const style = (sideBar) => ({
    background: "#15171c",
    width: "350px",
    height: "100vh",
    display: "flex",
    position: "fixed",
    top: "0",
    right: sideBar ? "0" : "-100%",
    transition: "350ms",
    zIndex: "10",
  });

  useEffect(() => {
    if (localStorage.getItem("noSpoilLevel") != null) {
      setSpoilerLevel(localStorage.getItem("noSpoilLevel"));
    }
    if (
      localStorage.getItem("userSession") != null &&
      localStorage.getItem("noSpoilLevel") == null
    ) {
      const getUser = async () => {
        await axios
          .get("/api/user/get-spoiler-level")
          .then((response) => {
            setSpoilerLevel(response.data);
          })
          .catch((error) => {
            console.log("error: ");
            console.log(error);
          });
      };
      getUser();
    }
  }, []);

  useEffect(() => {
    const handler = (event) => {
      if (!sideBarElement.current) {
        return;
      }
      if (!sideBarElement.current.contains(event.target)) {
        setSideBar(false);
      }
    };
    document.addEventListener("click", handler, true);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const handleSaveSpoilerLevel = async () => {
    if (spoilerLevel < 0 || spoilerLevel > 31) {
      setErrorMessage("Number must be between 0 and 31");
      return;
    }
    setErrorMessage("");
    localStorage.setItem("noSpoilLevel", spoilerLevel);
    if (localStorage.getItem("userSession") != null) {
      await axios
        .post("/api/user/set-spoiler-level", {
          username: localStorage.getItem("userSession"),
          spoilerlevel: spoilerLevel,
        })
        .catch((error) => {
          console.log("error: ");
          console.log(error);
        });
    }
    setShowSpoilLevel(false);
  };

  const showSidebar = () => setSideBar(!sideBar);

  return (
    <div>
      <button className="account-button" onClick={showSidebar}>
        {localStorage.getItem("userSession")}
      </button>
      <div style={style(sideBar)} ref={sideBarElement}>
        <div className="side-bar-content">
          <div className="side-bar-header">
            Hi {localStorage.getItem("userSession")}!
          </div>
          <div className="side-bar-links">
            <div className="side-bar-link">My Account</div>
            <div
              className="side-bar-link"
              onClick={() => setShowSpoilLevel(!showSpoilLevel)}
            >
              No Spoil Level
            </div>
            {showSpoilLevel ? (
              <div>
                <div className="side-bar-sub-link">
                  <div>Spoil Level</div>
                  <input
                    className="spoil-level"
                    type="number"
                    min={0}
                    max={31}
                    defaultValue={spoilerLevel}
                    onChange={(e) => {
                      setSpoilerLevel(e.target.value);
                    }}
                  ></input>
                </div>
                {errorMessage ? (
                  <div className="side-bar-error-message">{errorMessage}</div>
                ) : (
                  <div></div>
                )}
                <div
                  className="save-spoil-level"
                  onClick={handleSaveSpoilerLevel}
                >
                  Save
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <div className="side-bar-link" onClick={() => handleLogOut()}>
              Log Out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

AccountMenu.propTypes = {
  handleLogOut: PropTypes.func.isRequired,
};
