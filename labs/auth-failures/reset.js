const resetProgress = require("../../engine/resetProgress");

module.exports = function(callback){
  resetProgress("auth-failures", callback);
};