import express from "express";
import asyncHandler from "express-async-handler";
import User from "../db/models/user.mjs";
import bcrypt from "bcrypt";

const router = express.Router();

router.post(
  "/make-salt",
  asyncHandler(async (req, res) => {
    if (!req.body.username)
      return res.status(401).send({ message: "Please enter a username." });
    const emailTaken = await User.findOne({ email: req.body.email });
    const userNameTaken = await User.findOne({ username: req.body.username });
    let message = "";

    if (emailTaken) message = "An account already exists with this email.";

    if (userNameTaken) message = "Username is already taken.";

    if (emailTaken || userNameTaken)
      return res.status(401).send({ message: message });

    const salt = await bcrypt.genSalt(10);
    res.status(200).send(salt);
  })
);

router.post(
  "/get-salt",
  asyncHandler(async (req, res) => {
    if (!req.body.username)
      res.status(401).send({ message: "Username or password invalid." });
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      res.status(401).send({ message: "Username or password invalid." });
    else res.status(200).send(user.salt);
  })
);

router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const userCheck = await User.findOne({ username: req.body.username });
    if (userCheck)
      res.status(401).send({ message: "Username is already taken." });
    const { username, password, salt, email } = req.body;
    const user = new User({
      username,
      password,
      salt,
      email,
    });
    await user.save();

    req.session.username = { username };

    res.status(201).send(user);
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      res.status(401).send({ message: "Username or password invalid." });
    else if (user.password === req.body.password) {
      req.session.username = { username: user.username };
      res.status(200).send(user);
    } else res.status(401).send({ message: "Username or password invalid." });
  })
);

router.post(
  "/logout",
  asyncHandler(async (req, res) => {
    req.session.destroy();
    res.status(200).send({ message: "Logged out." });
  })
);

router.post(
  "/set-spoiler-level",
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      res
        .status(401)
        .send({ message: "Failed to save spoiler level. Please try again." });
    user.spoilerlevel = req.body.spoilerlevel;
    await user.save();
    res.status(200).send(user);
  })
);

router.get(
  "/get-spoiler-level",
  asyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      res
        .status(401)
        .send({ message: "Failed to get spoiler level. Please try again." });
    res.status(200).send(user.spoilerlevel);
  })
);

export default router;
