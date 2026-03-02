const crypto = require("crypto");

module.exports = function(db, sessionId, password, callback) {

  // real secure session
  const realSession =
    crypto.randomBytes(16).toString("hex");

  if (sessionId === realSession) {
    return callback(null, [1], "Admin access");
  }

  callback(null, [], "Invalid session token");
};