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

function findCurrencybyId({
  id,
}) {
  return DB.Currency.findByPk(id)
}

function updateCurrency({
  id,
  current_exchange_balance, 
}) { 
  return DB.Currency.update({
    current_exchange_balance, 
  }, {
    where: {
      id,
    }
  })
}

module.exports = {
  addCurrency,
  findCurrencybyId,
  updateCurrency
}