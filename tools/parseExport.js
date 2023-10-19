
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
    input: fs.createReadStream('data/from.xml'),
    crlfDelay: Infinity
    });

// write out file line by line
const writeStream = fs.createWriteStream('data/out.xml');

rl.on('line', (line) => {
    //console.log(`Line from file: ${line}`);
    // tagsRegex is any line that starts with whitespace and then a tag that isn't title
    const tagsRegex = /^\s*<(?!title).*>/g
    if (!line.match(tagsRegex))
    {
        writeStream.write(fixRefTags(addTags(line)) + '\n');
    }

});

rl.on('close', () => {
    console.log('File processed');
    writeStream.end();
});

