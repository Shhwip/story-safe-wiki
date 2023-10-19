import express from "express";
import Promise from "prfun";
import fs from "fs";
import Parsoid from "parsoid-jsapi";
import cheerio from "cheerio";

const router = express.Router();

router.get("/", async (req, res) => {
    // get the wikitext
    // we will replace this with a call to the database
    var lung = fs.readFileSync('test.xml', 'utf8');
    // console.log(lung.length)

    // parse the wikitext into a parsoid document
	var pdoc = await Parsoid.parse(lung, { pdoc: true });
    // console.log("pdoc");
    // console.log(pdoc);

    // serialize the document so we can send it to the client
    var record = await pdoc.document.outerHTML;

    // Load the HTML into cheerio
    const $ = cheerio.load(record);

    // // Remove all <pre> tags
    // $('pre').remove();

    // // find the pre elements
    // $('pre').each((index, element) => {
    //     // replace the <pre> element with its contents
    //     $(element).replaceWith($(element).html());
    // });
    //
    // // find the title element
    // const titleElement = $('title');
    //
    // // replace the title element with an h1 element
    // titleElement.replaceWith('<h1>' + titleElement.text() + '</h1>');

    // find the <pre> elements
    $('pre').each((index, element) => {
        const preContent = $(element).html();
        const replacedContent = preContent.replace(/&lt;title&gt;/g, '').replace(/&lt;\/title&gt;/g, '');

        // create a new <div> element with the parsed content
        const divElement = $('<div class="title">').html(replacedContent);

        // replace the <pre> element with the parsed content
        $(element).replaceWith(divElement);
    });


    // get modified html
    const modifiedHTML = $.html();

    // console.log("record")
	// console.log(record);
    
    // send the serialized document to the client
  res.status(200).send(modifiedHTML);
});


export default router;