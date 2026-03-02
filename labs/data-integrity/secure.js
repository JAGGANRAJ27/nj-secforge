const crypto = require("crypto");

const SECRET = "njsecforge-secret";

function sign(data){
  return crypto
    .createHmac("sha256", SECRET)
    .update(data)
    .digest("hex");
}

module.exports = function(db, sessionData, signature, callback) {

  const expected = sign(sessionData);

  if (signature !== expected) {
    return callback(null, [], "Integrity check failed");
  }

  const session = JSON.parse(sessionData);

  const query = `SIGNED SESSION ROLE=${session.role}`;

  if (session.role === "admin") {
    return callback(null, [1], query);
  }

  callback(null, [], query);
};