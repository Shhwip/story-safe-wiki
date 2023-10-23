import express from "express";
import asyncHandler from "express-async-handler";
import Article from "../db/models/article.mjs";

const router = express.Router();

router.post(
  "/add",
  asyncHandler(async (req, res) => {
    const articleCheck = await Article.findOne({ title: req.body.title });
    if (articleCheck)
      res.status(401).send({ message: "article already created" });
    const { title, text } = req.body;
    const article = new Article({
      title,
      text,
    });
    await article.save();

    res.status(201).send(article);
  })
);

export default router;