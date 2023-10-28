import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import Article from "../db/models/article.mjs";

router.get("/", async (req, res) => {
    // Get the search query from the request
    const searchQuery = req.query.q.replace(/\w\S*/g, (word) => {
        return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
    });
    console.log("Search Start")
    console.log(searchQuery);

    try {
        const results = await Article
            .find({ title: searchQuery });

        // Check if there are any search results
        if (results.length === 1) {
            res.status(200).json(results);
            //console.log(results);
            console.log(results.length);
        } else {
            // no exact matches
            res.status(200).json({ message: "Could not find any exact title matches" });
            console.log("no exact matches.")
            console.log(results.length);
        }
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get("/bigSearch", async (req, res) => {
    const searchQuery = req.query.q;
    console.log("Search Start from main Search")
    console.log(searchQuery);

    try {
        // Use a case-insensitive regular expression to match titles
        const titleResults = await Article.find({ title: { $regex: new RegExp(searchQuery, 'i') } });
        const bodyResults = await Article.find({ text: { $regex: new RegExp(searchQuery, 'i') } });

        // combine the results from both title and body searches
        const results = [...titleResults, ...bodyResults];

        // Check if there are any search results
        if (!results || results.length === 0) {
            // no results
            res.status(404).json({ message: "Could not find any search results for that term" });
        } else {
            // more than 1 result
            res.status(200).json(results);
            console.log(results.length);
        }
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
