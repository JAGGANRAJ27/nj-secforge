const fs = require("fs");
const path = require("path");

function listLabs() {

  const labsPath = path.join(__dirname, "..", "labs");

  const labFolders = fs.readdirSync(labsPath);

  const labs = [];

  labFolders.forEach(labName => {

    const instructionsPath =
      path.join(labsPath, labName, "instructions.json");

    if (fs.existsSync(instructionsPath)) {

      const instructions = require(instructionsPath);

      labs.push({
        name: labName,
        title: instructions.title,
        difficulty: instructions.difficulty,
        owasp: instructions.owasp
      });
    }
  });

  return labs;
}

module.exports = listLabs;