module.exports = function(db, input, password, callback) {

  try {

    // force an error intentionally
    if (input.includes("'")) {
      throw new Error(
        "SQL Error at /controllers/user.js:42\nDB_PASSWORD=admin123"
      );
    }

    callback(null, [], "No error triggered");

  } catch (err) {

    // ❌ leak stack trace
    callback(null, [1], err.stack);
  }

};