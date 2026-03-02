module.exports = function(db, role, password, callback) {

  // REAL USER ROLE (server controlled)
  const user = {
    username: "guest",
    role: "user"
  };

  if (user.role === "admin") {
    return callback(null, [1], "Admin access");
  }

  callback(null, [], "Access denied (proper authorization)");
};