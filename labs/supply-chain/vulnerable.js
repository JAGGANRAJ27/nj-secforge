const helper = require("./maliciousLib");

module.exports = function(db, input, password, callback) {

  const output = helper.process(input);

  const query =
    output.result + "\n" + (output.leaked || "");

  if (output.leaked) {
    return callback(null, [1], query);
  }

  callback(null, [], query);
};