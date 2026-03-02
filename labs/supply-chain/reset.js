const resetProgress = require("../../engine/resetProgress");

module.exports = function(callback){
  callback();
};

module.exports = function(callback){
  resetProgress("supply-chain", callback);
}