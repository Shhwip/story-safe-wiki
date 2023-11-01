import express from "express";
import Article from "../db/models/article.mjs";

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

    var document = article.text;

    res.status(200).send(document);
});

router.post("/:title", async (req, res) => {
        const articleCheck = await Article.findOne({ title: req.body.title });
        if (!articleCheck){
            res.status(401).send({ message: "article hasn't been created" });
        }
        const { title, text } = req.body;
        // TODO: call the edit history function here
        const article = new Article({
            title,
            text,
        });
        await article.save();
        
        res.status(201).send(article);
    });



export default router;