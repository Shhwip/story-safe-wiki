import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import Article from "../db/models/article.mjs";

router.get("/", async (req, res) => {
  // Get the search query from the request
  const searchQuery = req.query.q.replace(/\w\S*/g, (word) => {
    return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
  });

  try {
    const results = await Article.find({ title: searchQuery });

    // Check if there are any search results
    if (results.length === 1) {
      res.status(200).json(results);
    } else {
      // no exact matches
      res
        .status(200)
        .json({ message: "Could not find any exact title matches" });
    }
  } catch (error) {
    //Todo: add error handling, potentially a log file
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/bigSearch", async (req, res) => {
  const searchQuery = req.query.q;

  try {
    // Use a case-insensitive regular expression to match titles
    const titleResults = await Article.find({
      title: { $regex: new RegExp(searchQuery, "i") },
    });
    const bodyResults = await Article.find({
      text: { $regex: new RegExp(searchQuery, "i") },
    });

    // Remove items from bodyResults that are also in titleResults based on _id
    const uniqueBodyResults = bodyResults.filter((bodyResult) => {
      return !titleResults.some(
        (titleResult) =>
          titleResult._id.toString() === bodyResult._id.toString()
      );
    });

    // combine the results from both title and body searches
    const results = [...titleResults, ...uniqueBodyResults];

    // Check if there are any search results
    if (!results || results.length === 0) {
      // no results
      res
        .status(200)
        .json({ message: "Could not find any search results for that term" });
    } else {
      // more than 1 result
      res.status(200).json(results);
    }
  } catch (error) {
    //Todo: add error handling, potentially a log file
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
