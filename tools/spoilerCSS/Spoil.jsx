// Generates CSS for your max spoil level content
const fs = require("fs");

const maxSpoilLevel = 31; // Replace with the max spoil level for your wiki

let cssRules = "";
let cssRulesA = "";

for (let i = 1; i <= maxSpoilLevel; i++) {
    for (let j = 1; j <= i; j++) {
        cssRules += `[data-spoil-level='${i}'] .spoil_${j},`;
    }
}

for (let i = 1; i <= maxSpoilLevel; i++) {
    for (let j = 1; j <= i; j++) {
        cssRulesA += `[data-spoil-level='${i}'] .spoil_${j} a,`;
    }
}

// Remove the trailing comma and space
cssRules = cssRules.slice(0, -1);
cssRulesA = cssRulesA.slice(0, -1);

// Define the CSS content
const cssContent = `
/* Generated CSS Rules for Max Spoil Level ${maxSpoilLevel} */
/* Copy Generated Output to Spoil.css*/
${cssRules} {
  color: inherit;
  background-color: inherit;
  border-radius: inherit;
}

${cssRulesA} {
  color: var(--link-color);
  background-color: transparent;
  border-radius: 0;
}
`;

// Write the CSS content to a file
fs.writeFileSync("generatedStyles.css", cssContent, "utf-8");

console.log("CSS file generated successfully!");
