const db = require("../config/db");

/* MARK LAB COMPLETED */
function markCompleted(username, labName) {

  db.run(
    `INSERT INTO progress (username, lab)
     SELECT ?, ?
     WHERE NOT EXISTS (
       SELECT 1 FROM progress
       WHERE username=? AND lab=?
     )`,
    [username, labName, username, labName]
  );
}

/* GET COMPLETED LABS */
function getProgress(username, callback) {

  db.all(
    "SELECT lab FROM progress WHERE username=?",
    [username],
    (err, rows) => {

      if (err || !rows) {
        return callback([]);
      }

      const completed = rows.map(r => r.lab);
      callback(completed);
    }
  );
}

module.exports = {
  markCompleted,
  getProgress
};