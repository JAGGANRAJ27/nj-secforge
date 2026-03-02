module.exports = function(db, input, password, callback) {

  // server-side configuration ✅
  const debugEnabled = false; // production safe

  if (debugEnabled) {
    return callback(null, [1], "Debug data");
  }

  callback(null, [], "Debug access blocked");
};