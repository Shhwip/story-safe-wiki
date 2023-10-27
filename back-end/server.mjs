import "./loadEnvironment.mjs";
import "./db/conn.mjs";
import MongoDBStore from "./db/sessions.mjs";
import session from "express-session";
import express from "express";
import cors from "cors";
import http from "http";
import helloWorld from "./routes/helloWorld.mjs"
import searchRoute from "./routes/searchRoute.mjs";
import user from "./routes/user.mjs";
import parse from "./routes/parse.mjs"
import edit from "./routes/edit.mjs"
import addArticle from "./routes/addArticle.mjs"

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    name: "session-id",
    store: MongoDBStore,
    cookie: { maxAge: 2629800000, sameSite: false, secure: false },
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/edit", edit);
app.use("/parse", parse);
app.use("/search", searchRoute);
app.use("/user", user);
app.use("/addArticle", addArticle);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Socket IO and express server listening on port: ${PORT}`);
});
