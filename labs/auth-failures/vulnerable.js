module.exports = function(db, sessionId, password, callback) {

  // predictable sessions ❌
  const sessions = {
    "1000": "admin",
    "1001": "user"
  };

  const role = sessions[sessionId];

  if (role === "admin") {
    return callback(
      null,
      [1],
      "Admin session accepted"
    );
  }

  callback(null, [], "Logged in as normal user");
};