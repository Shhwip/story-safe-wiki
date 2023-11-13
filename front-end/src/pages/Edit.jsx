import Header from "../components/Header";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MDEditor, { selectWord } from "@uiw/react-md-editor";
import "./Edit.css";

export default function Edit() {
  const { title } = useParams();
  const [article, setArticle] = useState(null);
  const [articleLoaded, setArticleLoaded] = useState(false);

  useEffect(() => {
    const getMessage = async () => {
      await axios
        .get("http://localhost:4000/edit/" + title)
        .then((response) => {
          response.data ? setArticle(response.data) : setArticle("empty");
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

  return (
    <div>
      <Header />
      <div className="container">
        <div data-color-mode="light">
          {articleLoaded ? (
            <MDEditor height={800} value={article} onChange={setArticle} preview="edit"/>
          ) : (
            <div>Loading</div>
          )}
        </div>
      </div>
    </div>
  );
}
