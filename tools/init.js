#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const pkgPath = path.join(projectRoot, "package.json");

if (!fs.existsSync(pkgPath)) {
  console.log("❌ No package.json found in this directory.");
  process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

pkg.scripts = pkg.scripts || {};

let addedSomething = false;

if (!pkg.scripts.dev) {
  pkg.scripts.dev = "JetFast dev";
  console.log("✅ Added 'dev' script");
  addedSomething = true;
} else {
  console.log("⚠️ 'dev' script already exists — not modifying");
}

if (!pkg.scripts.build) {
  pkg.scripts.build = "JetFast build";
  console.log("✅ Added 'build' script");
  addedSomething = true;
} else {
  console.log("⚠️ 'build' script already exists — not modifying");
}

if (addedSomething) {
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  console.log("🎉 package.json updated successfully");
} else {
  console.log("👍 Nothing to change — JetFast already configured");
}
