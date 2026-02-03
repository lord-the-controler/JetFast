#!/usr/bin/env node

const path = require("path");
const command = process.argv[2];

if (command === "init") {
  require(path.join(__dirname, "init.js"));
} else if (command === "dev") {
  require(path.join(__dirname, "watcher.js"));
} else if (command === "build") {
  require(path.join(__dirname, "generate-output.js"));
} else {
  console.log("Usage: jetfast <init|dev|build>");
}
