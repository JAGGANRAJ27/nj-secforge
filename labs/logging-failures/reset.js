const resetProgress = require("../../engine/resetProgress");

module.exports = function(callback){
  // reload lab state by restarting counter
  delete require.cache[
    require.resolve("./secure")
  ];
  delete require.cache[
    require.resolve("./vulnerable")
  ];

  callback();
};

module.exports = function(callback){
  resetProgress("logging-failures", callback);
};