const DB = require('../model')

function addCurrencyHistory({ 
  currency_price,
  currency_id, 
}) { 
  return DB.CurrencyHistory.create({
    currency_id,
    currency_price, 
  })
}

module.exports = {
  addCurrencyHistory,
}