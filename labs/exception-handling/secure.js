module.exports = function(db, input, password, callback) {

  try {

    if (input.includes("'")) {
      throw new Error("Database failure");
    }

    callback(null, [], "Request processed");

  } catch (err) {

    // ✅ safe handling
    console.error(err.message);

    callback(
      null,
      [],
      "Something went wrong. Please try again later."
    );
  }

};