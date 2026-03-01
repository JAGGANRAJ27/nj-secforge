const path = require("path");
const fs = require("fs");

function loadReset(labName) {

  const resetPath = path.join(
    __dirname,
    "..",
    "labs",
    labName,
    "reset.js"
  );

  if (!fs.existsSync(resetPath)) {
    return null;
  }

  return require(resetPath);
}

module.exports = loadReset;