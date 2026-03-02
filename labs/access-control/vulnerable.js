module.exports = function(db, role, password, callback) {

  // TRUSTS USER INPUT ❌
  if (role === "admin") {
    return callback(
      null,
      [1],
      "Access granted to ADMIN PANEL"
    );
  }

  callback(null, [], "Access denied");
};