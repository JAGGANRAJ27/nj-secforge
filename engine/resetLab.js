const db = require("../config/db");

function resetSQLiLab(callback) {

  db.serialize(() => {

    // Remove existing users
    db.run("DELETE FROM users");
    db.run("DELETE FROM progress");

    // Restore default vulnerable data
    db.run(`
      INSERT INTO users (username,password,role)
      VALUES
      ('admin','admin123','admin'),
      ('user','1234','user')
    `, callback);


  });
}

module.exports = {
  resetSQLiLab
};