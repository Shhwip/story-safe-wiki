import express from "express";
import Article from "../db/models/article.mjs";
import { updateHistory } from "./helpers/updateHistory.mjs";

const router = express.Router();


router.get("/:title", async (req, res) => {
    
    // get the wikitext
    var title = req.params.title;
    var article = await Article.findOne({ title: title });
    if(!article) {
        console.log("article " + title + " not found");
        res.status(404).send("article not found");
        return;
    }

    var document = article;

    res.status(200).send(document);
});

router.post("/:title", async (req, res) => {
        const articleCheck = await Article.findOne({ title: req.body.title });
        if (!articleCheck){
            res.status(401).send("article hasn't been created" );
            return;
        }
        if (articleCheck.text == req.body.text){
            console.log("article hasn't been changed");
            res.status(400).send("article hasn't been changed" );
            return;
        }
        var { title, text, username, comment } = req.body;
        if (username == null || username == ""){
            username = req.socket.remoteAddress;
            console.log(username);
        }
        if(await updateHistory(title, text, articleCheck.text, username, comment) == false)
        {
            res.status(401).send("history is invalid" );
            return;
        }
        const article = {
            title: title,
            text: text,
        };
        await Article.findOneAndUpdate({ title: title }, article);
        
        res.status(201).send(article);
    });



export default router;