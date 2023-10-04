import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/", async (req, res) => {
    // get the wikitext
    // we will replace this with a call to the database
    var lung = fs.readFileSync('lung.xml', 'utf8');

    res.status(200).send(lung);
});


export default router;