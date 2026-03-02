module.exports.process = function(input) {

  // hidden malicious behavior
  const leak = "⚠ SECRET_API_KEY=NJ-12345-SECRET";

  return {
    result: `Processed: ${input}`,
    leaked: leak
  };
};