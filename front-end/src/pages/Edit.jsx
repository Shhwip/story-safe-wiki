import Header from "../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import "./Edit.css";

export default function Edit() {
  const { title } = useParams();
  const [article, setArticle] = useState(null);
  const [articleLoaded, setArticleLoaded] = useState(false);
  const [isCommentModalActive, setIsCommentModalActive] = useState(false);
  const [comment, setComment] = useState("");
  const [ip, setIP] = useState("");
  const navigate = useNavigate();


  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    console.log(res.data);
    setIP(res.data.ip);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const getMessage = async () => {
      await axios
        .get("http://localhost:4000/edit/" + title)
        .then((response) => {
          response.data ? setArticle(response.data.text) : setArticle("empty");
          setArticleLoaded(true);
          console.log("success");
        })
        .catch((error) => {
          console.log("error: ");
          console.log(error);
        });
    };
    getMessage();
    console.log("displayMessage: ");
    console.log(article);
  }, []);

  const openCloseCommentModal = () => {
    setIsCommentModalActive(!isCommentModalActive);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    console.log(article);
    const username = localStorage.getItem("userSession") || ip;
    await axios
      .post("http://localhost:4000/edit/" + title, {
        title: title,
        text: article,
        ip: ip,
        username: username,
        comment: comment,
      })
      .then((response) => {
        console.log("success");
        console.log(ip);
        console.log(localStorage.getItem("userSession"));
      })
      .catch((error) => {
        console.log("error: ");
        console.log(error);
      });
    openCloseCommentModal();
    const encodedTitle = encodeURIComponent(title);
    navigate(`/w/${encodedTitle}`);
  };

  return (
    <div>
      <Header />
      <div className={`container ${isCommentModalActive ? "modalIsOpen" : ""}`}>
        <div data-color-mode="light">
          {articleLoaded ? (
            <div>
              <textarea
                className="article-textarea"
                value={article}
                onChange={(e) => setArticle(e.target.value)}
              />
              <button onClick={openCloseCommentModal} className="submit-button">
                Submit
              </button>
            </div>
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
      {isCommentModalActive ? (
        <div className="modal">
          <div className="modal-background" onClick={openCloseCommentModal}></div>
          <div className="modal-content">
            <div className="modal-box">
              <textarea
                className="comment-textarea"
                placeholder="Please enter a description of your changes."
                onChange={handleCommentChange}
              ></textarea>
              <div className="buttons-container">
                <button className="submit-button" onClick={handleSubmit}>
                  Submit
                </button>
                <button onClick={openCloseCommentModal} className="cancel-button">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
