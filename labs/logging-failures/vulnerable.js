let attempts = 0;

module.exports = function(db, username, password, callback) {

  attempts++;

  // attack happening silently ❌
  const message = `Login failed (${attempts} attempts)`;

  callback(null, [], message);
};