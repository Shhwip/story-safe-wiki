import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import Article from "../db/models/article.mjs";

router.get("/", async (req, res) => {
    // Get the search query from the request
    const searchQuery = req.query.q;
    console.log("Search Start")
    console.log(searchQuery);

    try {
        const results = await Article
            .find({ title: searchQuery });

        // Check if there are any search results
        if (!results || results.length === 0) {
            // no results
            res.status(404).json({ message: "Could not find any search results for that term" });
        } else if (results.length === 1) {
            // exact match
            res.status(200).json(results);
            //console.log(results);
            console.log(results.length);
        } else {
            // more than 1 result
            console.log(results.length);
        }
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
