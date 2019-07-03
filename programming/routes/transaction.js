var express = require('express');
var router = express.Router();
const numeral = require('numeral');
const userMiddleware = require('../middleware/user')
const authMiddleware = require('../middleware/auth')
const adminMiddleware = require('../middleware/admin')
const walletInterface = require('../interface/Wallet')
const currencyInterface = require('../interface/Currency')
const transactionInterface = require('../interface/Transaction')

/* GET home page. */
router.get('/total_balance', adminMiddleware,  async function(req, res, next) {
  const {
    query: {
      currency_id
    }
  } = req
  if(isNaN(currency_id) || numeral(currency_id).value() <= 0 ) {
    return res.status(422).json({
      "message": 'paramter is invalid.'
    })
  } else {
    try {
      const getBalance = await transactionInterface.getBalanceGroupByCurrency({ currency_id, })
      const [ balance ] =  getBalance
      const [ totalBalance ] = balance
      return res.status(200).json(totalBalance)
    } catch(err) {
      return res.status(500).json(err)
    }
  }

});

router.post('/deposit', userMiddleware, async function(req, res, next) {
  const {
    userId,
    body: {
      amount = 0,
      currency_id = 0,
      wallet_id = 0,
    }
  } = req
  if(isNaN(currency_id) || numeral(currency_id).value() <= 0 
  || isNaN(amount) || numeral(amount).value() <= 0 
  || isNaN(wallet_id) || numeral(wallet_id).value() <= 0  ) {
    return res.status(422).json({
      "message": 'paramter is invalid.'
    })
  } else {
    const findWallet = await walletInterface.findWalletbyId({ id: wallet_id})
    if(findWallet && findWallet.dataValues) {
      const {
        user_id
      } = findWallet.dataValues
      if(user_id == userId) {
        const getCurrency = await currencyInterface.findCurrencybyId({ id:  currency_id}) 
        if(getCurrency && getCurrency.dataValues) {
          const {
            current_exchange_balance: price
          } = getCurrency.dataValues
          const createDeposit = await transactionInterface.deposit({
            amount,
            price,
            currency_id,
            wallet_id,
          })
          if(createDeposit && createDeposit.dataValues) {
            return res.status(201).json(createDeposit.dataValues)
          } else {
            return res.status(500).json({
              message: 'cannot deposit'
            })
          }
        } else {
          return res.status(404).json({
            message: 'Currenycy not found.'
          })
        }
      } else {
        return res.status(401).json({
          message: 'Permission deny wallet is not yours.'
        })
      }
    } else {
      return res.status(500).json({
        message: 'Cannot create.'
      })
    }
  } 
});


router.post('/deposit', userMiddleware, async function(req, res, next) {
  const {
    userId,
    body: {
      amount = 0,
      currency_id = 0,
      wallet_id = 0,
    }
  } = req
  if(isNaN(currency_id) || numeral(currency_id).value() <= 0 
  || isNaN(amount) || numeral(amount).value() <= 0 
  || isNaN(wallet_id) || numeral(wallet_id).value() <= 0  ) {
    return res.status(422).json({
      "message": 'paramter is invalid.'
    })
  } else {
    const findWallet = await walletInterface.findWalletbyId({ id: wallet_id})
    if(findWallet && findWallet.dataValues) {
      const {
        user_id
      } = findWallet.dataValues
      if(user_id == userId) {
        const getCurrency = await currencyInterface.findCurrencybyId({ id:  currency_id}) 
        if(getCurrency && getCurrency.dataValues) {
          const {
            current_exchange_balance: price
          } = getCurrency.dataValues
          const createDeposit = await transactionInterface.deposit({
            amount,
            price,
            currency_id,
            wallet_id,
          })
          if(createDeposit && createDeposit.dataValues) {
            return res.status(201).json(createDeposit.dataValues)
          } else {
            return res.status(500).json({
              message: 'cannot deposit'
            })
          }
        } else {
          return res.status(404).json({
            message: 'Currenycy not found.'
          })
        }
      } else {
        return res.status(401).json({
          message: 'Permission deny wallet is not yours.'
        })
      }
    } else {
      return res.status(500).json({
        message: 'Cannot create.'
      })
    }
  } 
});

router.post('/withdraw', userMiddleware, async function(req, res, next) {
  const {
    userId,
    body: {
      amount = 0,
      currency_id = 0,
      wallet_id = 0,
    }
  } = req
  if(isNaN(currency_id) || numeral(currency_id).value() <= 0 
  || isNaN(amount) || numeral(amount).value() <= 0 
  || isNaN(wallet_id) || numeral(wallet_id).value() <= 0  ) {
    return res.status(422).json({
      "message": 'paramter is invalid.'
    })
  } else {
    const findWallet = await walletInterface.findWalletbyId({ id: wallet_id})
    if(findWallet && findWallet.dataValues) {
      const {
        user_id
      } = findWallet.dataValues
      if(user_id == userId) {
        const getCurrency = await currencyInterface.findCurrencybyId({ id:  currency_id}) 
        if(getCurrency && getCurrency.dataValues) {
          const {
            current_exchange_balance: price
          } = getCurrency.dataValues
          const getBalance = await transactionInterface.getBalanceByCurrency({
            currency_id,
            wallet_id,
          })
          const [ dataBalance = { sum: 0 } ] = getBalance
          const [ { sum } ] = dataBalance
          const balanceToWithdraw = amount * price
          console.log('sum', sum)
          console.log('balanceToWithdraw', balanceToWithdraw)
          if(balanceToWithdraw <= sum) {
            const createWithdraw = await transactionInterface.withdraw({
              amount,
              price,
              currency_id,
              wallet_id,
            })
            if(createWithdraw && createWithdraw.dataValues) {
              return res.status(201).json(createWithdraw.dataValues)
            } else {
              return res.status(500).json({
                message: 'cannot withdraw'
              })
            }
          } else {
            return res.status(500).json({
              message: 'Balance not enough'
            })
          }
        } else {
          return res.status(404).json({
            message: 'Currency not found.'
          })
        }
      } else {
        return res.status(401).json({
          message: 'Permission deny wallet is not yours.'
        })
      }
    } else {
      return res.status(500).json({
        message: 'Cannot create.'
      })
    }
  } 
});


router.post('/exchange', userMiddleware, async function(req, res, next) {
  const {
    userId,
    body: {
      amount = 0,
      currency_id = 0,
      wallet_id = 0,
      currency_id_receiver = 0,
      wallet_id_receiver = 0,
    }
  } = req
  if(isNaN(currency_id) || numeral(currency_id).value() <= 0 
  || isNaN(amount) || numeral(amount).value() <= 0 
  || isNaN(wallet_id) || numeral(wallet_id).value() <= 0 
  || isNaN(currency_id_receiver) || numeral(currency_id_receiver).value() <= 0
  || isNaN(wallet_id_receiver) || numeral(wallet_id_receiver).value() <= 0  ) {
    return res.status(422).json({
      "message": 'paramter is invalid.'
    })
  } else {
    // find wallet
    const findWallet = await walletInterface.findWalletbyId({ id: wallet_id})
    const receiverWallet = await walletInterface.findWalletbyId({ id: wallet_id_receiver})
    if(findWallet && findWallet.dataValues && receiverWallet && receiverWallet.dataValues) {
      const {
        user_id
      } = findWallet.dataValues
      if(user_id == userId) {
        // get current price for currency
        const getCurrency = await currencyInterface.findCurrencybyId({ id:  currency_id}) 
        const getReceiverCurrency = await currencyInterface.findCurrencybyId({ id:  currency_id_receiver }) 

        if(getCurrency && getCurrency.dataValues && getReceiverCurrency && getReceiverCurrency.dataValues) {
          const {
            current_exchange_balance: price
          } = getCurrency.dataValues
          // check wallet balance by currency
          const getBalance = await transactionInterface.getBalanceByCurrency({
            currency_id,
            wallet_id,
          })
          const [ dataBalance = { sum: 0 } ] = getBalance
          const [ { sum } ] = dataBalance
          const balanceToWithdraw = amount * price
          if(balanceToWithdraw <= sum) {
            // withdraw from wallet
            const createWithdraw = await transactionInterface.withdraw({
              amount,
              price,
              currency_id,
              wallet_id,
            })
            if(createWithdraw && createWithdraw.dataValues) {
              // making exchange rate
              const {
                current_exchange_balance: reciver_currency_price // currecnt price for receiver currency
              } = getReceiverCurrency.dataValues
              const amount_receiver = balanceToWithdraw / reciver_currency_price // amount of currency for receiver
              const createDeposit = await transactionInterface.deposit({
                amount: amount_receiver,
                price: reciver_currency_price,
                currency_id: currency_id_receiver,
                wallet_id: wallet_id_receiver,
              }) // deposit to receiver
              if(createDeposit && createDeposit.dataValues) {
                return res.status(200).json({
                  receiver: createDeposit.dataValues,
                  exchanger: createWithdraw.dataValues,
                })
              } else {
                return res.status(500).json({
                  message: 'cannot exchange to receiver'
                })
              }
            } else {
              return res.status(500).json({
                message: 'cannot withdraw'
              })
            }
          } else {
            return res.status(500).json({
              message: 'Balance not enough'
            })
          }
        } else {
          return res.status(404).json({
            message: 'Currency not found.'
          })
        }
      } else {
        return res.status(401).json({
          message: 'Permission deny wallet is not yours.'
        })
      }
    } else {
      return res.status(500).json({
        message: 'Cannot create.'
      })
    }
  } 
});

module.exports = router;