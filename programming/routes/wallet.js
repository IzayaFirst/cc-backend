var express = require('express');
var router = express.Router();
const numeral = require('numeral');
const userMiddleware = require('../middleware/user')
const authMiddleware = require('../middleware/auth')
const walletInterface = require('../interface/Wallet')

/* GET home page. */
router.get('/', function(req, res, next) {

});

router.post('/', userMiddleware, async function(req, res, next) {
  const {
    userId,
    body: {
      wallet_name = '',
      wallet_detail = '',
    }
  } = req
  if(wallet_name.trim().length == 0) {
    return res.status(422).json({
      "message": 'paramter is invalid.'
    })
  } else {
    try {
      const createWallet = await walletInterface.createWallet({
        wallet_name,
        wallet_detail,
        user_id: userId
      })
      console.log('userId', userId)
      if(createWallet && createWallet.dataValues) {
        return res.status(201).json(createWallet.dataValues)
      } else {
        return res.status(500).json({
          message: 'cannot create wallet'
        })
      }
    } catch (err) {
      return res.status(500).json(err)
    }
  } 
});

module.exports = router;