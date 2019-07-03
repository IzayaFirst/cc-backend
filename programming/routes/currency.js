var express = require('express');
var router = express.Router();
const adminMiddleware = require('../middleware/admin')
const currencyInterface = require('../interface/Currency')
const historyInterface = require('../interface/History')
const numeral = require('numeral');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({
    message: 'Simple Wallet API'
  })
});

router.patch('/:currency_id',adminMiddleware, async function(req, res, next) {
  
})

router.post('/', adminMiddleware, async function(req, res, next) {
  const {
    body: {
      currency_name = '',
      current_exchange_balance = 0,     
    }
  } = req

  if(currency_name.trim().length == 0 || isNaN(current_exchange_balance) || numeral(current_exchange_balance).value() <= 0) {
    return res.status(422).json({
      "message": 'paramter is invalid.'
    })
  } else {
    try {
      const addCurrency = await currencyInterface.addCurrency({
        currency_name,
        current_exchange_balance: numeral(current_exchange_balance).value(),
      })
      if(addCurrency && addCurrency.dataValues) {
        const {
          dataValues: {
            id,
            current_exchange_balance: update_balance,
          }
        } = addCurrency

        const addHistory = await historyInterface.addCurrencyHistory({
          currency_price: update_balance,
          currency_id: id
        })
        if(addHistory && addHistory.dataValues) {
          return res.status(201).json({
            history: addHistory,
            currency: addCurrency,
          })
        } else {  
          return res.status(500).json({
            message: 'cannot add currency history'
          })
        }

      } else {
        return res.status(500).json({
          message: 'cannot add currency'
        })
      }
      return res.json({
        message: 'Simple Wallet API'
      })
    } catch(err) {
      return res.status(500).json(err)
    }
  }



 
});

module.exports = router;
