const config = require('../config.json')
const Sequelize = require('sequelize');
const UserModel = require('./User')
const WalletModel = require('./Wallet')
const CurrencyModel = require('./Currency')
const CurrencyHistoryModel = require('./CurrencyHistory')
const TransactionModel = require('./Transaction')
const sequelize = new Sequelize(config.database_name, config.database_username, config.database_password, {
  host: config.database_host,
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
const User = UserModel(sequelize, Sequelize)
const Wallet = WalletModel(sequelize, Sequelize)
const Currency = CurrencyModel(sequelize, Sequelize)
const CurrencyHistory = CurrencyHistoryModel(sequelize, Sequelize)
const Transaction = TransactionModel(sequelize, Sequelize)

const Owner = User.hasMany(Wallet)
const OwnerOf = Wallet.belongsTo(User, {
  foreignKey: 'user_id'
})

const Paid = Wallet.hasMany(Transaction)
const PaidOf =Transaction.belongsTo(Wallet, {
  foreignKey: 'wallet_id'
})

const Trade = Currency.hasMany(Transaction)
const TradeOf = Transaction.belongsTo(Currency, {
  foreignKey: 'currency_id'
})

const History = Currency.hasMany(CurrencyHistory)
const Historyof = CurrencyHistory.belongsTo(Currency, {
  foreignKey: 'currency_id' 
})


module.exports = {
  sequelize,
  User,
  Wallet,
  Currency,
  CurrencyHistory,
  Transaction,
  History,
  Historyof,
}