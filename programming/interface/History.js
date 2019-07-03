const DB = require('../model')

function addCurrencyHistory({ 
  currency_price,
  currency_id, 
}) { 
  return DB.CurrencyHistory.create({
    currency_price,
    currency_id,
  })
}

module.exports = {
  addCurrencyHistory,
}