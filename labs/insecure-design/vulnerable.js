module.exports = function(db, item, price, callback) {

  const query =
    `PURCHASE ITEM=${item} FOR ₹${price}`;

  // vulnerable: trusts client price
  if (price < 100) {
    return callback(null, [1], query);
  }

  callback(null, [], query);
};