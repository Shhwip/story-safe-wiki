// function removeTags(str) {
//     return str.replace(/^\s*<(?!title).*>/g, '');
//   }

import axios from 'axios';
import fs from 'fs';
import readline from 'readline';

function sleepFor(sleepDuration){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* Do nothing */ }
}

async function addArticle(title, text, infobox) {

    if (infobox == '')
    {
        infobox = null;
    }
    const data = { title: title, text: text, infobox: infobox };
    await axios.post('http://localhost:4000/addArticle/add', data)
    .then((res) => {
        console.log(`statusCode: ${res.statusCode}`)
    })
    .catch((error) => {
        console.log("upload error")
        console.log(error)
    });

}

function addTags(str) {
    return str.replace(/(&lt;)/g, '<').replace(/(&gt;)/g, '>');
  }

function fixRefTags(str) {
    return str.replace(/name="([^">]*)>/g, 'name="$1"/>');
    
}

// read in file line by line
const rl = readline.createInterface({
    input: fs.createReadStream('data/everything.xml'),
    crlfDelay: Infinity
    });


var articleText = '';
var articleTitle = '';
const notTitleRegex = /^\s*<(?!title).*>/g
const pageOpenRegex = /^\s*<page>/g
const pageCloseRegex = /^\s*<\/page>/g
const titleRegex = /^\s*<title>(.*)</
const infoboxOpenRegex = /.*{{[iI]nfobox.*/
const infoboxCloseRegex = /.*}}.*/
const tabberOpenRegex = /.*&lt;tabber.*/
const tabberCloseRegex = /.*&lt;\/tabber.*/
const galleryRegex = /==Fanart Gallery==/
const galleryOpenRegex = /.*&lt;gallery.*/
const galleryCloseRegex = /.*&lt;\/gallery.*/
var tabberFlag = false;
var galleryFlag = false;
var infobox = '';
var infoboxFlag = false;
var pageCount = 0;
rl.on('line', (line) => {

    if (line.match(tabberOpenRegex))
    {
        console.log('tabber found');
        tabberFlag = true;
    }

    if (line.match(galleryOpenRegex))
    {
        console.log('gallery found');
        galleryFlag = true;
    }


    if (line.match(infoboxOpenRegex))
    {
        console.log('infobox found1');
        infoboxFlag = true;
    }
    if (infoboxFlag)
    {
        infobox = infobox.concat(line, '\n');
    }
    
    var title = line.match(titleRegex);
    if (line.match(pageOpenRegex))
    {
        pageCount++;
        console.log('Page ' + pageCount);
    }
    if (title)
    {
        console.log([title[1]]);
        articleTitle = title[1];
    }

    if (!line.match(notTitleRegex) && !line.match(galleryRegex) && !infoboxFlag && !tabberFlag && !galleryFlag)
    {
        articleText = articleText.concat(fixRefTags(addTags(line)) , '\n');
    }
    if (line.match(galleryCloseRegex))
    {
        console.log('gallery closed');
        galleryFlag = false;
    }
    if (line.match(infoboxCloseRegex))
    {
        console.log('infobox closed');
        infoboxFlag = false;
    }
    if (line.match(tabberCloseRegex))
    {
        console.log('tabber closed');
        tabberFlag = false;
    }

    if (line.match(pageCloseRegex))
    {
        console.log('End of page ' + pageCount);
        if(articleText.length < 100)
        {
            console.log(articleText);
        }
        //sleepFor(150);
        addArticle(articleTitle, articleText, infobox);
        infobox = '';
        articleText = '';
        articleTitle = '';
        infoboxFlag = false;
        tabberFlag = false;
        galleryFlag = false;
    }

});

rl.on('close', () => {
    console.log('File processed');
});

