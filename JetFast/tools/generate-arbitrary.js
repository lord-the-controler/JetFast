const fs = require("fs");
const path = require("path");

// const { defaultConfig, loadUserConfig } = require("./config");
// const deepMerge = require("../core/merge.js");

// const userConfig = loadUserConfig();
// const config = deepMerge(structuredClone(defaultConfig), userConfig);

// if (config.debug) {
//   console.log("🧠 JetFast Config Loaded:");
//   console.log(JSON.stringify(config, null, 2));
// }

const HTML_ROOT = path.join(__dirname, "../../");
const OUTPUT_FILE = path.join(__dirname, "../outputDev/arbitrary-jet.css");

const IGNORED_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
]);

function readIfExists(file) {
  try {
    return fs.readFileSync(file, "utf-8");
  } catch {
    return null;
  }
}

let output = [];
const globalSeen = new Set();

const regexs = {
  classRegex: /(class|className)="([^"]+)"/gi,
};

function getAllSourceFiles(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      getAllSourceFiles(fullPath, results);
    } else if (/\.(html|jsx|tsx)$/.test(entry.name)) {
      results.push(fullPath);
    }
  }

  return results; 
}

function escapeClassNames(cls) {
  return cls.replace(/([!#$%&'()*+,./:;<=>?@[\\\]^`{|}~])/g, "\\$1");
}

output.length = 0;
globalSeen.clear();

const sourceFiles = getAllSourceFiles(HTML_ROOT);

for (const file of sourceFiles) {
  const content = fs.readFileSync(file, "utf-8");

  if (!content.includes("AJ-")) continue;

  for (const match of content.matchAll(regexs.classRegex)) {
    const classList = match[2];

    for (const className of classList.split(/\s+/)) {
      if (!className) continue;
      if (globalSeen.has(className)) continue;
      if (!className.startsWith("AJ-")) continue;
      if (!className.includes(":")) continue;

      globalSeen.add(className);

      const step1 = className.indexOf(":");
      if (step1 === -1) continue;

      const step2 = className.slice(0, step1);
      const step3 = className.slice(step1 + 1);

      const property = step2.split("-").slice(1).join("-");
      let value = step3;

      if (
        property === "background-image" &&
        !value.startsWith("url(") &&
        !value.endsWith(")")
      ) {
        value = `url("${value}")`;
      }

      output.push(
        `.${escapeClassNames(className)}{\n\t${property}:${value};\n}`,
      );
    }
  }
}

const css = output.join("\n\n") + "\n";
const prev = readIfExists(OUTPUT_FILE);

if (prev === css) {
  console.log("⏭️  No CSS changes, skipped write");
  process.exit(0);
}

const TEMP_FILE = OUTPUT_FILE + ".tmp";

fs.writeFileSync(TEMP_FILE, css);
fs.renameSync(TEMP_FILE, OUTPUT_FILE);

console.log(`✅ Generated ${output.length} Classes`);
