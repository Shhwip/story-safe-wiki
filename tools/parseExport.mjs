// function removeTags(str) {
//     return str.replace(/^\s*<(?!title).*>/g, '');
//   }

import axios from 'axios';
import fs from 'fs';
import readline from 'readline';

async function addArticle(title, text) {

    const data = { title: title, text: text };
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
var pageCount = 0;
rl.on('line', (line) => {

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

    if (!line.match(notTitleRegex))
    {
        articleText = articleText.concat(fixRefTags(addTags(line)) , '\n');
    }

    else if (line.match(pageCloseRegex))
    {
        console.log('End of page ' + pageCount);
        addArticle(articleTitle, articleText);
        articleText = '';
        articleTitle = '';
    }

});

rl.on('close', () => {
    console.log('File processed');
});

