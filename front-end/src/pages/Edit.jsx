import Header from "../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import "./Edit.css";

export default function Edit() {
  const { title } = useParams();
  const [article, setArticle] = useState(null);
  const [articleLoaded, setArticleLoaded] = useState(false);
  const [ip, setIP] = useState("");

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

  const handleSubmit = async () => {
    console.log(article);
    await axios
      .post("http://localhost:4000/edit/" + title, {
        title: title,
        text: article,
        ip: ip,
        username: localStorage.getItem("userSession"),
      })
      .then((response) => {
        console.log("success");
      })
      .catch((error) => {
        console.log("error: ");
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div data-color-mode="light">
          {articleLoaded ? (
            <div>
              <MDEditor
                height={800}
                value={article}
                onChange={setArticle}
                preview="edit"
                commands={[]}
                extraCommands={[]}
              />
              <button onClick={handleSubmit} className="submit-button">Submit</button>
            </div>
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    </div>
  );
}
