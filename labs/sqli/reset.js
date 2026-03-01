const db = require("../../config/db");

module.exports = function(callback) {

  db.serialize(() => {

    // Clear vulnerable data
    db.run("DELETE FROM users");
    db.run("DELETE FROM progress");

    // Restore default state
    db.run(`
      INSERT INTO users (username,password,role)
      VALUES
      ('admin','admin123','admin'),
      ('user','1234','user')
    `, callback);

  });

};