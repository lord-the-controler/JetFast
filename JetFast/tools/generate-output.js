const fs = require("fs")

const arbitrary=fs.readFileSync("./outputDev/arbitrary-jet.css","utf-8")
const purge=fs.readFileSync("./outputDev/output.css","utf-8")

const output=fs.writeFileSync("./output/output.css",([arbitrary,purge].join("\n")))