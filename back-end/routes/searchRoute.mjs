import express from "express";
import mongoose from "mongoose";
const router = express.Router();

router.get("/", async (req, res) => {
    // Get the search query from the request
    const searchQuery = req.query.q;
    console.log("Search Start")
    console.log(searchQuery);
    // SEARCH WITH A MODEL
    // Perform a search in database based on the searchQuery
    // Replace with actual database query logic
    // Example:
    // const results = await DatabaseModel.find({ $text: { $search: searchQuery } });

    // TEXT-BASED SEARCHES
    // TODO: Collection needs to have a text index set up, for text search to work.

    try {
        // Perform a text-based search in your database
        // Replace 'yourCollection' with the name of your collection
        const results = await mongoose.connection
            .collection("companies")
            .find({ $text: { $search: searchQuery } })
            .toArray();

        // Check if there are any search results
        if (!results || results.length === 0) {
            res.status(404).json({ message: "Could not find any search results for that term" });
        } else {
            res.status(200).json(results);
        }
    } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;
