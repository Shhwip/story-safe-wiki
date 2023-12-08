import Header from "../components/Header";
import Preview from "../components/Preview";
import "./History.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function formatDate(timestamp) {
  const date = new Date(timestamp);
  const dateString = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;
  const timeString = `${date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  })} UTC`;

  return `${dateString} ${timeString}`;
}

export default function History() {
  const { title } = useParams();
  const [history, setHistory] = useState(null);
  const [content, setContent] = useState("");

  const openCloseCommentModal = () => {
    setContent("");
  };

  const getEdit = async (title, id) => {
    console.log("getEdit");
    await axios
      .get("/api/h/" + title + "/" + id)
      .then((response) => {
        console.log("single history success");
        console.log(response.data);
        setContent(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log("error: ");
        console.log(error);
      });
  };

  useEffect(() => {
    const getHistory = async () => {
      await axios
        .get("/api/h/" + title)
        .then((response) => {
          setHistory(response.data);
          console.log("success");
          console.log(response.data);
        })
        .catch((error) => {
          console.log("error: ");
          console.log(error);
        });
    };
    getHistory();
  }, [title]);

  return (
    <div>
      <Header />
      <div className="history">
        <h1 className="history-title">History</h1>
        <div className="history-list">
          {history ? (
            history.map((item) => {
              return (
                <div className="history-item">
                  <div className="history-details">
                    <h3>{item.username}</h3>
                    <p>{formatDate(item.timestamp)}</p>
                    <p>{item.outputSize}</p>
                    <p>{item.comment}</p>
                  </div>

                  <div className="history-buttons">
                    <button
                      onClick={() => {
                        getEdit(title, item.previousID);
                      }}
                    >
                      before
                    </button>
                    <button
                      onClick={() => {
                        getEdit(title, item._id);
                      }}
                    >
                      after
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div></div>
          )}
        </div>
        {content ? (
          <div className="history-preview">
            <Preview content={content} setContent={setContent} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
