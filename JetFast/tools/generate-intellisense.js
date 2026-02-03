const fs = require("fs");
const path = require("path");

const JETS_DIR = path.join(__dirname, "../Jets");

// output file
const OUTPUT = path.join(__dirname, "../jetfast.css-data.json");

const CLASS_REGEX = /\.([a-zA-Z0-9_-]+)\s*\{/g;

const classes = [];
const globalSeen = new Set();

const files = fs.readdirSync(JETS_DIR).filter(f => f.endsWith(".css"));

for (const file of files) {
  const filePath = path.join(JETS_DIR, file);
  const content = fs.readFileSync(filePath, "utf8");

  let match;

  while ((match = CLASS_REGEX.exec(content)) !== null) {
    const className = match[1];

    if (globalSeen.has(className)) continue;
    globalSeen.add(className);

    classes.push({
      name: className,
      description: `JetFast class from ${file}`
    });
  }
}

const json = {
  version: 1.1,
  atDirectives: [],
  pseudoClasses: [],
  pseudoElements: [],
  properties: [],
  classes
};

fs.writeFileSync(OUTPUT, JSON.stringify(json, null, 2));

console.log(`✅ Generated ${classes.length} IntelliSense classes`);
