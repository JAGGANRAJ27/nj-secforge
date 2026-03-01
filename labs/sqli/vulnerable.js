module.exports = function(db, username, password, callback) {

  const query = `
    SELECT * FROM users WHERE username='${username}' AND password='${password}'
  `;

  db.all(query, [], (err, rows) => {
    callback(err, rows, query);
  });
};