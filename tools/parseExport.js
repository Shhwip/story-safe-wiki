
// function removeTags(str) {
//     return str.replace(/^\s*<(?!title).*>/g, '');
//   }

function addTags(str) {
    return str.replace(/(&lt;)/g, '<').replace(/(&gt;)/g, '>');
  }

function fixRefTags(str) {
    return str.replace(/name="([^">]*)>/g, 'name="$1"/>');
    
}


const fs = require('fs');
const readline = require('readline');
// read in file line by line
const rl = readline.createInterface({
    input: fs.createReadStream('data/everything.xml'),
    crlfDelay: Infinity
    });

// write out file line by line
const writeStream = fs.createWriteStream('data/out.xml');

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
    }
    else if (line.match(pageCloseRegex))
    {
        console.log('End of page ' + pageCount);
    }

    if (!line.match(notTitleRegex))
    {
        //writeStream.write(fixRefTags(addTags(line)) + '\n');
    }

});

rl.on('close', () => {
    console.log('File processed');
    writeStream.end();
});

