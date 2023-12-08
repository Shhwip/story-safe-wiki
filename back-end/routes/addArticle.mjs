import express from "express";
import asyncHandler from "express-async-handler";
import Article from "../db/models/article.mjs";
import { updateHistory } from "./helpers/updateHistory.mjs";

const router = express.Router();

router.post(
  "/add",
  asyncHandler(async (req, res) => {
    const { title, text, infobox, spoiler_level, username } = req.body;
    const comment = "create article";
    const previousText = "";
    const history = await updateHistory(
      title,
      text,
      previousText,
      username,
      comment
    );
    if (history == false) {
      res.status(500).send({ message: "history is invalid" });
      return;
    }
    res.status(201).send({ message: "article history created" });
  })
);

router.post(
  "/",
  asyncHandler(async (req, res) => {
    const articleCheck = await Article.findOne({ title: req.body.title });
    if (articleCheck) {
      res.status(401).send({ message: "article already created" });
    } else {
      const { title, text, infobox, spoiler_level, username } = req.body;
      const comment = "create article";
      const previousText = "";
      const history = await updateHistory(
        title,
        text,
        previousText,
        username,
        comment
      );
      const article = new Article({
        title,
        text,
        infobox,
        spoiler_level,
      });
      await article.save();

      res.status(201).send(article);
    }
  })
);

export default router;
