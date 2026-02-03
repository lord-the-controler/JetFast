let fs = require("fs");
let path = require("path");

let allCssClassName = new Set();
let jetsPath = path.join(__dirname, "../Jets");
let allClasses = {};

let HTML_ROOT = path.join(__dirname, "../../");
let globalSeen = new Set();

let regexs = {
  htmlClassRegex: /class(Name)?="([^"]+)"/g,
  cssClassNameRegex: /\.([a-zA-Z_][a-zA-Z0-9_:\-]*)\s*\{/g,
  cssBlockRegex: /\.([a-zA-Z_][a-zA-Z0-9_:\-]*)\s*\{([\s\S]*?)\}/g,
};

function getAllCssFiles(dir) {
  let results = [];
  let entries = fs.readdirSync(dir, { withFileTypes: true });

  for (let entry of entries) {
    let fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results = results.concat(getAllCssFiles(fullPath));
    } else if (entry.name.endsWith(".css")) {
      results.push(fullPath);
    }
  }

  return results;
}

let allCssFiles = getAllCssFiles(jetsPath);

let outputFilePath = path.join(__dirname, "../outputDev/output.css");

fs.writeFileSync(outputFilePath, "");

function getAllSourceFiles(dir) {
  let results = [];
  let entries = fs.readdirSync(dir, { withFileTypes: true });

  for (let entry of entries) {
    let fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results = results.concat(getAllSourceFiles(fullPath));
    } else if (
      entry.name.endsWith(".html") ||
      entry.name.endsWith(".jsx") ||
      entry.name.endsWith(".tsx")
    ) {
      results.push(fullPath);
    }
  }

  return results;
}

let sourceFiles = getAllSourceFiles(HTML_ROOT);

for (let file of sourceFiles) {
  let content = fs.readFileSync(file, "utf-8");

  for (let match of content.matchAll(regexs.htmlClassRegex)) {
    let classList = match[2];

    for (let className of classList.split(/\s+/)) {
      if (!className) continue;
      globalSeen.add(className);
    }
  }
}

for (let file of allCssFiles) {
  let content = fs.readFileSync(file, "utf-8");

  for (let match of content.matchAll(regexs.cssBlockRegex)) {
    let className = match[1];
    let body = match[2];

    if (!globalSeen.has(className)) continue;
    if (allClasses[className]) continue;

    allClasses[className] = {};

    for (let decl of body.split(";")) {
      let [prop, value] = decl.split(":");
      if (!prop || !value) continue;
      allClasses[className][prop.trim()] = value.trim();
    }

    allCssClassName.add(className);
    fs.appendFileSync(outputFilePath, `.${className}{${body}}\n`);
  }
}
