const db = require("../../config/db");
const bcrypt = require("bcrypt");
const resetProgress = require("../../engine/resetProgress");


module.exports = async function(callback){

  const hash = await bcrypt.hash("admin123", 10);

  db.serialize(() => {

    db.run("DELETE FROM users");

    db.run(`
      INSERT INTO users (username,password,role)
      VALUES ('admin', ?, 'admin')
    `, [hash], callback);

  });

};

module.exports = function(callback){
  resetProgress("crypto-failures", callback);
};