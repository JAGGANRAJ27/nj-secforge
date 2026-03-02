const db = require("../config/db");

module.exports = function(labName, callback) {

  db.run(
    "DELETE FROM progress WHERE lab = ?",
    [labName],
    callback
  );

};