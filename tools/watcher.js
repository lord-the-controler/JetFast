const chokidar = require("chokidar");
const { exec } = require("child_process");
const path = require("path");

const ROOT = path.resolve(__dirname, "../../");

console.log("🧐 Watching HTML files in:", ROOT);

let timer = null;

function isIgnored(file) {
  const normalized = file.replace(/\\/g, "/");

  return (
    normalized.includes("/node_modules/") ||
    normalized.includes("/.git/") ||
    normalized.includes("/JetFast/outputDev/") ||
    normalized.includes("/JetFast/output/") ||
    normalized.includes("/JetFast/Jets/") ||
    normalized.endsWith(".tmp")
  );
}

const watcher = chokidar.watch(ROOT, {
  ignored: isIgnored,
  ignoreInitial: true,
  awaitWriteFinish: {
    stabilityThreshold: 300,
    pollInterval: 100,
  },
});

function runGenerator(reason, file) {
  console.log(`🔁 ${reason}: ${file}`);

  clearTimeout(timer);
  timer = setTimeout(() => {
    exec(
      `node "${path.join(__dirname, "generate-arbitrary.js")}"`,
      (err, stdout, stderr) => {
        if (err) {
          console.error("❌ arbitrary error", err);
          return;
        }
      },
    );
    exec(
      `node "${path.join(__dirname, "generate-purge.js")}"`,
      (err, stdout, stderr) => {
        if (err) {
          console.error("❌ purge error", err);
          return;
        }
      },
    );
  }, 300);
}

watcher.on("add", (file) => runGenerator("add", file));
watcher.on("change", (file) => runGenerator("change", file));
watcher.on("unlink", (file) => runGenerator("unlink", file));

console.log("✅ Watcher ready");
