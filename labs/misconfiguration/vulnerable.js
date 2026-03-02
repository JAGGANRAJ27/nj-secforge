module.exports = function(db, input, password, callback) {

  // user controls debug flag ❌
  if (input === "true") {
    return callback(
      null,
      [1],
      "DEBUG MODE ENABLED: DB_PASSWORD=admin123"
    );
  }

  callback(null, [], "Debug disabled");
};