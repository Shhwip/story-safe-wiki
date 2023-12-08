import express from "express";
import Article from "../db/models/article.mjs";
import User from "../db/models/user.mjs";
import Comment from "../db/models/comment.mjs";

const router = express.Router();

router.get("/:title", async (req, res) => {
  const article = await Article.findOne({ title: req.params.title });
  if (!article) {
    res.status(404).send({ message: "Article not found." });
    return;
  }
  const messages = await Comment.find({ article: article._id })
    .sort({ timeStamp: 1 })
    .populate("user", "username")
    .exec()
  res.status(200).send(messages);
});

router.post("/:title", async (req, res) => {
  const { text, username } = req.body;
  const article = await Article.findOne({ title: req.params.title });
  let user;

  if(!username){
    const comment = new Comment({
      text: text,
      ip: username,
      article: article._id,
      timeStamp: Date.now(),
      flags: 0,
    });
    await comment.save();
    res.status(201).send(comment);
    return;
  }


  user = await User.findOne({ username: username });

  if (!article || !user) {
    res.status(401).send({ message: "Error while saving message please try again later." });
  }
  const comment = new Comment({
    text: text,
    user: user,
    article: article._id,
    timeStamp: Date.now(),
    flags: 0,
  });
  await comment.save();
  res.status(201).send(comment);
});

export default router;
