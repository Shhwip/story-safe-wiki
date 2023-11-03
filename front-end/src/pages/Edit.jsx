import Header from "../components/Header";
import EditTool from "../components/EditTool";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Edit() {
  const { title } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const getMessage = () => {
      axios.get(
        "http://localhost:4000/edit/" + title
      ).then((response) => {
        response.data ? setArticle(response.data) : setArticle("empty");
        console.log("success")
      }).catch((error) => {
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
      <EditTool article={article}/>
    </div>
  );
}
