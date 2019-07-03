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

router.patch('/:currency_id', adminMiddleware, async function(req, res, next) {
  const {
    params: {
      currency_id,
    },
    body: {
      current_exchange_balance = 0,
    }
  } = req
  if(isNaN(currency_id) || numeral(currency_id).value() <= 0 || isNaN(current_exchange_balance) || numeral(current_exchange_balance).value() <= 0) {
    return res.status(422).json({
      "message": 'paramter is invalid.'
    })
  } else {
    const findCurrency =await currencyInterface.findCurrencybyId({ 
      id: numeral(currency_id).value()
    })
    console.log('findCurrency.dataValues', findCurrency.dataValues)
    if(findCurrency && findCurrency.dataValues) {
      const {
        id: updateId
      } = findCurrency.dataValues
      const updateCurrency = await currencyInterface.updateCurrency({
        id: updateId,
        current_exchange_balance:  numeral(current_exchange_balance).value() 
      })
      const [ numberUpdate ] = updateCurrency
      if(numberUpdate) {
        const addHistory = await historyInterface.addCurrencyHistory({
          currency_price: numeral(current_exchange_balance).value() ,
          currency_id: updateId
        })
        if(addHistory && addHistory.dataValues) {
          return res.status(201).json({
            history: addHistory,
            update: numberUpdate,
          })
        } else {  
          return res.status(500).json({
            message: 'cannot add currency history'
          })
        }
      } else {
        return res.status(500).json({
          "message": 'cannot update currency'
        })
      }
      console.log('updateCurrency', updateCurrency)
      return res.status(201).json({
        "message": '0.'
      })
    } else {
      return res.status(404).json({
        "message": 'cannot find currency id.'
      })
    }
  }
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
