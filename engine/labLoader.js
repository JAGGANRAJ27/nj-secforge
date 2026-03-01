const path = require("path");
const fs = require("fs");

function loadLab(labName, mode = "vulnerable") {

  const basePath = path.join(__dirname, "..", "labs", labName);

  if (!fs.existsSync(basePath)) return null;

  const instructions = require(path.join(basePath, "instructions.json"));

  const handler =
    mode === "secure"
      ? require(path.join(basePath, "secure.js"))
      : require(path.join(basePath, "vulnerable.js"));

  return {
    name: labName,
    instructions,
    handler
  };
}

module.exports = loadLab;