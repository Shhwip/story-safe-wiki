import express from "express";
import Article from "../db/models/article.mjs";
import { parseDocument } from "./helpers/parseDocument.mjs";

const router = express.Router();

router.get("/random", async (req, res) => {
  var count = await Article.countDocuments();
  var random = Math.floor(Math.random() * count);
  var article = await Article.findOne().skip(random);
  res.status(200).send(article.title);
});

router.get("/:title", async (req, res) => {
  // get the wikitext
  var title = req.params.title;
  var article = await Article.findOne({ title: title });
  if (!article) {
    //Todo: add error handling, potentially a log file
    //console.log("article " + title + " not found");
    res.status(404).send("article not found");
    return;
  }

   // Serialize the modified document
  const modifiedHTML = await parseDocument(article.text); 

  // send the serialized document to the client
  res.status(200).send(modifiedHTML);
});

export default router;
