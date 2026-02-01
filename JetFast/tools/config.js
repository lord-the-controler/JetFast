const fs = require("fs");
const path = require("path");

const defaultConfig = {
  input: ["**/*.html"],
  output: "JetFast/output/output.css",

  classPrefix: "",
  separator: "-",

  theme: {
    colors: {},
    spacing: {},
    fontSize: {},
  },

  debug: false,
};

function loadUserConfig() {
  const configPath = path.resolve(process.cwd(), "jetfast.config.js");

  if (!fs.existsSync(configPath)) {
    return {};
  }

  try {
    return require(configPath);
  } catch (err) {
    console.error("\n❌ JetFast config error");
    console.error(err.message);
    process.exit(1);
  }
}

module.exports = {
  defaultConfig,
  loadUserConfig,
};
