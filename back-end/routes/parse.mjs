import express from "express";
import * as cheerio from "cheerio";
import Parsoid from "parsoid-jsapi";
import Article from "../db/models/article.mjs";

const router = express.Router();

router.get("/:title", async (req, res) => {
    
    // get the wikitext
    var title = req.params.title;
    var article = await Article.findOne({ title: title });
    if(!article) {
        console.log("article " + title + " not found");
        res.status(404).send("article not found");
        return;
    }

    var document = article.text;

    // parse the wikitext into a parsoid document
	var pdoc = await Parsoid.parse(document, { pdoc: true });

    // serialize the document so we can send it to the client
    var record = pdoc.document.outerHTML;

    // Load the HTML into cheerio
    const $ = cheerio.load(record);

    // Replace <html> with <div> tag, keeping its children
    $('html').replaceWith(function () {
        return $('<main class="page__main" lang="en"></main>').append($(this).contents());
    });

    // remove grayed out stuff plus styles
    $('meta, link[rel="dc:isVersionOf"], link[href*="mediawiki.legacy.commonPrint"], title, base').remove();

    // EXTRACT TITLE
    // find <pre> elements
    $('pre').each((index, element) => {
        const preContent = $(element).html();

        // regular expressions to extract text within <title> tags
        const titleMatch = preContent.match(/&lt;title&gt;(.*?)&lt;\/title&gt;/i);

        if (titleMatch) {
            const titleText = titleMatch[1];
            // replace <pre> element with <div> containing the title content
            $(element).replaceWith(
                `<div class="page-header">
                            <div class="page-header__title-wrapper">
                                <h1 class="page-header__title">
                                    <span class="mw-page-title-main">${titleText}</span>
                                </h1>
                            </div>
                        </div>`);
        }
    });


    // APPEND REST TO <div class=page-content><div class="mw-body...><div class="mw-parser-output></div></div></div>
    // find the content following the <div class="page-header">
    const pageHeaderDiv = $('.page-header');
    const contentToWrap = pageHeaderDiv.nextAll();

    // create a new <div class="page-content">...
    const pageContentDiv = $('<div class="page-content"></div>');
    const mwBodyDiv = $('<div class="mw-body-content mw-content-ltr" lang="en" dir="ltr"></div>');
    const mwParserOutputDiv = $('<div class="mw-parser-output"></div>');

    // Append contentToWrap to mwParserOutputDiv...
    contentToWrap.appendTo(mwParserOutputDiv);
    mwParserOutputDiv.appendTo(mwBodyDiv);
    mwBodyDiv.appendTo(pageContentDiv);

    // append page-content after page-header
    pageHeaderDiv.after(pageContentDiv);


    // remove grayed out stuff plus styles
    $('div[class="shortdescription nomobile noexcerpt noprint searchaux"]').remove();
    $('div[typeof="mw:Extension/templatestyles mw:Transclusion"]').remove();
    $('div[typeof="mw:Extension/templatestyles"]').remove();
    $('link[rel="mw:PageProp/Category"]').remove();
    $('span[about="#mwt4"]').remove();


    // Serialize the modified document
    const modifiedHTML = $.html();

    
    // send the serialized document to the client
  res.status(200).send(modifiedHTML);
});


export default router;