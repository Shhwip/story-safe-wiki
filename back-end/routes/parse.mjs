import express from "express";
import fs from "fs";
import Parsoid from "parsoid-jsapi";
import * as cheerio from "cheerio";

const router = express.Router();

router.get("/body", async (req, res) => {
    // get the wikitext
    // we will replace this with a call to the database
    var document = fs.readFileSync('../tools/data/out.xml', 'utf8');

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


    // remove tabber and infobox section
    $('p[data-parsoid=\'{"dsr":[3430,3453,0,0]}\']').remove();
    $('p[data-parsoid=\'{"dsr":[3763,3771,0,0]}\']').remove();
    $('p[data-parsoid=\'{"dsr":[3927,3942,0,0]}\']').remove();

    $('p[data-parsoid=\'{"dsr":[24,41,0,0]}\']').remove();
    $('p[data-parsoid=\'{"dsr":[351,359,0,0]}\']').remove();
    $('p[data-parsoid=\'{"dsr":[515,524,0,0]}\']').remove();

    // remove grayed out stuff plus styles
    $('div[class="shortdescription nomobile noexcerpt noprint searchaux"]').remove();
    $('div[typeof="mw:Extension/templatestyles mw:Transclusion"]').remove();
    $('div[typeof="mw:Extension/templatestyles"]').remove();
    $('link[rel="mw:PageProp/Category"]').remove();
    $('span[about="#mwt4"]').remove();

    // remove bottom pre and mediawiki
    $('pre[data-parsoid=\'{"dsr":[63816,63892,1,0]}\']').remove();
    $('p[data-parsoid=\'{"dsr":[63893,63905,0,0]}\']').remove();

    // Serialize the modified document
    const modifiedHTML = $.html();

    
    // send the serialized document to the client
  res.status(200).send(modifiedHTML);
});


export default router;