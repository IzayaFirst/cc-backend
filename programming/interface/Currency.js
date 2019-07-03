const DB = require('../model')

function addCurrency({ 
  currency_name,
  current_exchange_balance, 
}) { 
  return DB.Currency.create({
    currency_name,
    current_exchange_balance, 
  })
}

module.exports = {
  addCurrency,
}