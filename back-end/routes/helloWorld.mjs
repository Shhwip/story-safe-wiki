import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log("in getHelloWorld");
  const record = "Hello world!";
  res.status(200).send(record);
});

export default router;