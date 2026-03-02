module.exports = function(db, sessionData, password, callback) {

  try {

    const session = JSON.parse(sessionData);

    const query =
      `SESSION ROLE=${session.role}`;

    // ❌ trusts client data
    if (session.role === "admin") {
      return callback(null, [1], query);
    }

    callback(null, [], query);

  } catch {
    callback(null, [], "Invalid session format");
  }
};