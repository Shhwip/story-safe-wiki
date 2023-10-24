
// function removeTags(str) {
//     return str.replace(/^\s*<(?!title).*>/g, '');
//   }
import axios from 'axios';
import fs from 'fs';
import readline from 'readline';

function addArticle(title, text) {

    const data = { title: title, text: text };
    axios.post('http://localhost:4000/addArticle/add', data)
    .then((res) => {
        console.log(`statusCode: ${res.statusCode}`)
        console.log(res)
    })
    .catch((error) => {
        console.error(error)
    })

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
    //console.log(`Line from file: ${line}`);
    // tagsRegex is any line that starts with whitespace and then a tag that isn't title

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
        addTags(line);
        fixRefTags(line);
        articleText = articleText.concat(line , '\n');
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

