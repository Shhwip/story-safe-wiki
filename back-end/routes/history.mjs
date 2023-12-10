import express from "express";
import History from "../db/models/history.mjs";
import Article from "../db/models/article.mjs";
import Delta from 'fossil-delta';
import * as cheerio from "cheerio";
import Parsoid from "parsoid-jsapi";
import { parseDocument } from "./helpers/parseDocument.mjs";


const router = express.Router();

router.get("/:title", async (req, res) => {
  var title = req.params.title;
  var history = await History.find({ title: title });
  history.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1));
  for (var i = 0; i < history.length; i++) {
    history[i].delta = null;
  }
  res.send(history);
});

router.get("/:title/:id", async (req, res) => {
    var id = req.params.id;
    var title = req.params.title;
    console.log("title: " + title);
    console.log("id: " + id);
    var history = await History.find({ title: title });
    var article = await Article.findOne({ title: title });
    if(!article) {
        console.log("article " + title + " not found");
        res.status(404).send("article not found");
        return;
    }
    if(id == null || id == "" || id == "null")
    {
        res.send("");
        return;
    }
    history.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1);
    var index = history.findIndex(x => x._id == id);
    if (index == -1)
    {
        res.status(404).send("history not found");
        return;
    }
    if (index == 0)
    {
        res.send(article.text);
        return;
    }
    var text = article.text;
    console.log("getting edit number " + index);
    for (var i = 0; i < index; i++)
    {
        console.log("applying delta");
        console.log(history[i].delta);
        text = Delta.apply(text, history[i].delta);
    }
    text = text.join("");

     // Serialize the modified document
    const modifiedHTML = parseDocument(text); 
     
     // send the serialized document to the client
   res.status(200).send(modifiedHTML);

})

export default router; 
