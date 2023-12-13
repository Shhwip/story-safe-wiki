# Importing a Wiki
If you would like to import a wiki you will need to export all of that wiki's pages.If your wiki has a database dump, you will need the file with all the wikitext of every article. It should be a .xml file. Otherwise navigate to the [Special:Export](https://en.wikipedia.org/wiki/Special:Export) page and export all articles. This is best done by exporting every category. Save this file as Story-Safe-Wiki/tools/data/everything.xml

## Parsing the wikitext

Make sure the backend of your wiki is running then navigate to the Story-Safe-Wiki/tools folder and run 

```
npm -install
node parseExport.mjs
```

This will remove the mediawiki only data from each article, remove the gallery, separate out the infobox and remove the tabber template. It also converts every `&lt;`to `<` and every `&lt;` to `>`.
Then after parsing each article it uploads it through the add article request in your wiki's back end.

## Troubleshooting
Sometimes the request to add an article doesn't go through. Feel free to run `node parseExport.mjs` again after changing line 136 from `sleepFor(150);` to `sleepFor(250);` or longer depending on the specs of your server.