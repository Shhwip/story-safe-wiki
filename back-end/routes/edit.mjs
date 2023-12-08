import express from "express";
import Article from "../db/models/article.mjs";
import { updateHistory } from "./helpers/updateHistory.mjs";
import * as cheerio from "cheerio";
import Parsoid from "parsoid-jsapi";

const router = express.Router();

router.post("/parse", async (req, res) => {
    var document = req.body.text;
 
     // parse the wikitext into a parsoid document
     var pdoc = await Parsoid.parse(document, { pdoc: true });
 
     // serialize the document so we can send it to the client
     var record = pdoc.document.outerHTML;
 
     // Load the HTML into cheerio
     const $ = cheerio.load(record);
 
     // Replace <html> with <div> tag, keeping its children
     $('html').replaceWith(function () {
         return $('<div></div>').append($(this).contents());
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
 
 
     // TABLE OF CONTENTS
     const firstH2Tag = $('.mw-parser-output h2').first();
     const tocElement = $('<div class="toc" role="navigation"></div>');
     const tocTitleElement = $('<div class="toctitle"><h2>Contents</h2></div>');
     tocElement.append(tocTitleElement);
     const tocListElement = $('<ul></ul>');
 
     let tocLevel1 = 0;
     let tocLevel2 = 0;
 
     // Iterate through each h2 and h3 tag within mw-parser-output
     $('.mw-parser-output h2, .mw-parser-output h3').each((index, element) => {
         // Determine the tag type (h2 or h3)
         const tagType = $(element).prop("tagName").toLowerCase();
 
         // Get the text or id of the tag
         const tagText = $(element).text();
         const tagId = $(element).attr("id");
 
         if (tagType === "h2") {
             // Increment the level 1 counter
             tocLevel1++;
 
             // Reset the level 2 counter
             tocLevel2 = 0;
 
             // Create a new level 1 TOC entry
             const tocEntryLevel1 = $(`
             <li class="toclevel-1 tocsection-${tocLevel1}">
                 <a href="#${tagId || tagText}">
                     <span class="tocnumber">${tocLevel1}</span>
                     <span class="toctext">${tagText}</span>
                 </a>
             </li>
         `);
 
             // Append the level 1 TOC entry to the TOC list
             tocListElement.append(tocEntryLevel1);
         } else if (tagType === "h3") {
             // Increment the level 2 counter
             tocLevel2++;
 
             // Create a new level 2 TOC entry
             const tocEntryLevel2 = $(`
             <li class="toclevel-2 tocsection-${tocLevel1}-${tocLevel2}">
                 <a href="#${tagId || tagText}">
                     <span class="tocnumber">${tocLevel1}.${tocLevel2}</span>
                     <span class="toctext">${tagText}</span>
                 </a>
             </li>
         `);
 
             // Find the parent level 1 TOC entry and append the level 2 TOC entry to it
             tocListElement.find(`.toclevel-1.tocsection-${tocLevel1}`).last().append(`<ul>${tocEntryLevel2}</ul>`);
         }
     });
 
 
     tocElement.append(tocListElement);
     firstH2Tag.before(tocElement);
 
 
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

router.get("/:title", async (req, res) => {
  // get the wikitext
  var title = req.params.title;
  var article = await Article.findOne({ title: title });
  if (!article) {
    //Todo: add error handling, potentially a log file
    //console.log("article " + title + " not found");
    res.status(404).send("article not found");
    return;
  }

  var document = article;

  res.status(200).send(document);
});

router.post("/:title", async (req, res) => {
  const articleCheck = await Article.findOne({ title: req.body.title });
  if (!articleCheck) {
    res.status(401).send("article was not found, please try again later.");
    return;
  }
  if (articleCheck.text == req.body.text) {
    res.status(400).send("article hasn't been changed");
    return;
  }
  var { title, text, username, comment } = req.body;
  if (username == null || username == "") {
    username = req.socket.remoteAddress;
  }
  if (
    (await updateHistory(title, text, articleCheck.text, username, comment)) ==
    false
  ) {
    res.status(401).send("history is invalid");
    return;
  }
  const article = {
    title: title,
    text: text,
  };
  await Article.findOneAndUpdate({ title: title }, article);

  res.status(201).send(article);
});

export default router;
