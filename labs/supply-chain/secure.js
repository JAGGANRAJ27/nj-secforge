const helper = require("./safeLib");

module.exports = function(db, input, password, callback) {

  const output = helper.process(input);

  callback(null, [], output.result);
};