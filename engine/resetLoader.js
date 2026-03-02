const path = require("path");
const fs = require("fs");

module.exports = function(name) {

  const resetPath = path.join(
    __dirname,
    "..",
    "labs",
    name,
    "reset.js"
  );

  if (fs.existsSync(resetPath)) {
    return require(resetPath);
  }

  return null;
};