module.exports = function(db, item, price, callback) {

  const REAL_PRICE = 100; // server controlled

  const query =
    `SERVER PRICE CHECK → ₹${REAL_PRICE}`;

  if (REAL_PRICE < 100) {
    return callback(null, [1], query);
  }

  callback(null, [], query);
};