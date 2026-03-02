let attempts = 0;

module.exports = function(db, username, password, callback) {

  attempts++;

  let message = `Login failed (${attempts} attempts)`;

  if (attempts >= 3) {
    message += " 🚨 SECURITY ALERT TRIGGERED";
    return callback(null, [1], message);
  }

  callback(null, [], message);
};