const bcrypt = require("bcrypt");

module.exports = function(db, username, password, callback) {

  db.get(
    "SELECT * FROM users WHERE username=?",
    [username],
    async (err, user) => {

      if (!user) return callback(null, [], "User not found");

      const match = await bcrypt.compare(password, user.password);

      callback(null, match ? [user] : [], "Password verified using bcrypt");
    }
  );

};