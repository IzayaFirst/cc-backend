const DB = require('../model')

function createWallet({  wallet_name, wallet_detail, user_id}) {
    return DB.Wallet.create({
        wallet_name, wallet_detail, user_id
    })
}

function findWalletbyId({
    id,
  }) {
    return DB.Wallet.findByPk(id)
  }

module.exports = {
    createWallet,
    findWalletbyId
}