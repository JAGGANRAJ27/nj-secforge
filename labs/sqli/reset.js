const db = require("../../config/db");

module.exports = function(callback) {

  const LAB = "sqli"; // change per lab

  db.serialize(() => {

    // Reset lab data
    db.run(
      "DELETE FROM users WHERE lab=?",
      [LAB]
    );

    // Reset auto increment
    db.run(
      "DELETE FROM sqlite_sequence WHERE name='users'"
    );

    // Restore defaults
    db.run(`
      INSERT INTO users (username,password,role,lab)
      VALUES
      ('admin','admin123','admin','sqli'),
      ('user','1234','user','sqli')
    `);

    // ⭐ reset ONLY this lab progress
    db.run(
      "DELETE FROM progress WHERE username=? AND lab=?",
      ["guest", LAB],
      callback
    );

  });

};