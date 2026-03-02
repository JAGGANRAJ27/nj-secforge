const path = require("path");
const fs = require("fs");

function loadLab(labName, mode = "vulnerable") {

  const labPath = path.join(__dirname, "..", "labs", labName);

  if (!fs.existsSync(labPath)) return null;

  const instructionsPath = path.join(labPath, "instructions.json");

  if (!fs.existsSync(instructionsPath)) return null;

  const instructions = require(instructionsPath);

  let handler = null;

  const handlerFile =
    mode === "secure" ? "secure.js" : "vulnerable.js";

  const handlerPath = path.join(labPath, handlerFile);

  // ⭐ check if handler exists
  if (fs.existsSync(handlerPath)) {
    handler = require(handlerPath);
  }

  return {
    name: labName,
    instructions,
    handler,
    underConstruction: handler === null
  };
}

module.exports = loadLab;