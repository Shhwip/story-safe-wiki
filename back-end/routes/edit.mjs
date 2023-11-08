import express from "express";
import Article from "../db/models/article.mjs";
import History from "../db/models/history.mjs";
import Delta from 'fossil-delta';

const router = express.Router();

async function checkValidHistory(history) {
    history.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1);
    for (var i = 0; i < history.length - 1; i++) {
        var current = history[i];
        var next = history[i + 1];
        if (current._id != next.previousID) {
            return false;
        }
    }
    return true;
}

async function updateHistory(title, editText, previousText, username) {
    var title = req.params.title;
    var history = await History.find({ title: title });
    if(await checkValidHistory(history) == false)
    {
        console.log("history is invalid");
        return false;
    }

    var lastID = history[history.length - 1]._id;
    var delta = Delta.create(editText, previousText);
    if(history.length == 0) {
        lastID = null;
    }
    var newHistory = new History({
        delta: delta,
        title: title,
        timestamp: Date.now(),
        username: username,
        previousID: lastID,
        outputSize: Delta.outputSize(delta),
    });
    
    await newHistory.save();

    return true;
}

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
        const { title, text, username } = req.body;
        // TODO: call the edit history function here
        if(await updateHistory(title, text, articleCheck.text, username) == false)
        {
            res.status(401).send({ message: "history is invalid" });
        }
        const article = new Article({
            title,
            text,
        });
        await article.save();
        
        res.status(201).send(article);
    });



export default router;