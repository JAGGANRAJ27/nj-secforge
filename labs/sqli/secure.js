module.exports = function(db, username, password, callback) {

  const query =
    "SELECT * FROM users WHERE username=? AND password=?";

  db.all(query, [username, password], (err, rows) => {
    callback(err, rows, query);
  });
};