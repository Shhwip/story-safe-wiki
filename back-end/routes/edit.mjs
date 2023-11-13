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

    console.log(document);

    res.status(200).send(document);
});

router.post("/:title", async (req, res) => {
        const articleCheck = await Article.findOne({ title: req.body.title });
        if (!articleCheck){
            res.status(401).send({ message: "article hasn't been created" });
        }
        var { title, text, username } = req.body;
        if (username == null || username == ""){
            username = req.socket.remoteAddress;
            console.log(username);
        }
        if(await updateHistory(title, text, articleCheck.text, username) == false)
        {
            res.status(401).send({ message: "history is invalid" });
        }
        const article = {
            title: title,
            text: text,
        };
        await Article.findOneAndUpdate({ title: title }, article);
        
        res.status(201).send(article);
    });



export default router;