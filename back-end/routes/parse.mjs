import express from "express";
import Promise from "prfun";
import fs from "fs";
import Parsoid from "parsoid-jsapi";
import cheerio from "cheerio";
//import {index} from "cheerio/lib/api/traversing";

const router = express.Router();

router.get("/", async (req, res) => {
    // get the wikitext
    // we will replace this with a call to the database
    var document = fs.readFileSync('lung.xml', 'utf8');

    // parse the wikitext into a parsoid document
	var pdoc = await Parsoid.parse(document, { pdoc: true });

    // serialize the document so we can send it to the client
    var record = await pdoc.document.outerHTML;

    // Load the HTML into cheerio
    const $ = cheerio.load(record);

    // Replace <html> with <div> tag, keeping its children
    $('html').replaceWith(function () {
        return $('<div class="document"></div>').append($(this).contents());
    });

    // remove grayed out stuff plus styles
    $('meta, link[rel="dc:isVersionOf"], link[href*="mediawiki.legacy.commonPrint"], title, base').remove();

    // remove top part with the p tag data-parsoid
    $('p[data-parsoid=\'{"dsr":[0,252,0,0]}\']').remove();


    // EXTRACT TITLE
    // find <pre> elements
    $('pre').each((index, element) => {
        const preContent = $(element).html();

        // regular expressions to extract text within <title> tags
        const titleMatch = preContent.match(/&lt;title&gt;(.*?)&lt;\/title&gt;/i);

        if (titleMatch) {
            const titleText = titleMatch[1];
            console.log(titleText);
            // replace <pre> element with <div> containing the title content
            $(element).replaceWith(`<div class="title">${titleText}</div>`);
        }
    })

    // Serialize the modified document
    const modifiedHTML = $.html();

    
    // send the serialized document to the client
  res.status(200).send(modifiedHTML);
});


export default router;