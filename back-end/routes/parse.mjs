import express from "express";
import Promise from "prfun";
import fs from "fs";
import Parsoid from "parsoid-jsapi";

const router = express.Router();

router.get("/", async (req, res) => {
    // get the wikitext
    // we will replace this with a call to the database
    var lung = fs.readFileSync('lung.xml', 'utf8');
    // console.log(lung.length)

    // parse the wikitext into a parsoid document
	var pdoc = await Parsoid.parse(lung, { pdoc: true });
    // console.log("pdoc");
    // console.log(pdoc);

    // serialize the document so we can send it to the client
    var record = await pdoc.document.outerHTML;
    // console.log("record")
	// console.log(record);
    
    // send the serialized document to the client
  res.status(200).send(record);
});


export default router;