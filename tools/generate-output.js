const fs = require("fs")
const path=require("path")

const arbitrary=fs.readFileSync(path.join(__dirname,"../outputDev/arbitrary-jet.css"),"utf-8")
const purge=fs.readFileSync(path.join(__dirname,"../outputDev/output.css"),"utf-8")

const output=fs.writeFileSync(path.join(__dirname,"../output/output.css"),([arbitrary,purge].join("\n")))