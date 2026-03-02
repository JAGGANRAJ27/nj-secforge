const fs = require("fs");
const path = require("path");

module.exports = function listLabs() {

  const labsDir = path.join(__dirname, "..", "labs");

  const labs = fs.readdirSync(labsDir)
    .map(folder => {

      const instructionsPath =
        path.join(labsDir, folder, "instructions.json");

      if (!fs.existsSync(instructionsPath)) return null;

      const instructions =
        JSON.parse(fs.readFileSync(instructionsPath));

      const match = instructions.owasp.match(/A(\d+)/);
      const number = match ? parseInt(match[1]) : 999;

      return {
        name: folder,
        title: instructions.title,
        difficulty: instructions.difficulty,
        owasp: instructions.owasp,
        owaspNumber: number
      };
    })
    .filter(Boolean);

  /* SORT */
  labs.sort((a, b) => a.owaspNumber - b.owaspNumber);

  return labs;
};