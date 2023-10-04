import Header from "../Components/Header";
import EditTool from "../Components/EditTool";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Edit() {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const getMessage = () => {
      axios.get(
        "http://localhost:4000/parse/"
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
