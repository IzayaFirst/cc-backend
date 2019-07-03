const Sequelize = require('sequelize')
const config = require('../config.json')
const UserModel = require('./user')
const ItemStockModel = require('./ItemStock')
const ItemModel = require('./Item')
const PromotionModel = require('./Promotion')
const BundleItemModel = require('./BundleItem')
const BundleModel = require('./Bundle')
const RedeemModel = require('./Redeem')
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
const ItemStock = ItemStockModel(sequelize, Sequelize)
const Item = ItemModel(sequelize, Sequelize)
const Promotion = PromotionModel(sequelize, Sequelize)
const BundleItem = BundleItemModel(sequelize, Sequelize)
const Bundle = BundleModel(sequelize, Sequelize)
const Redeem = RedeemModel(sequelize, Sequelize)
const Transaction = TransactionModel(sequelize, Sequelize)
const TransactionBundle = sequelize.define('transaction_bundle', {}, { underscored: true })

ItemStock.belongsTo(Item);
Item.hasMany(BundleItem)
Promotion.hasMany(Bundle)
Bundle.hasMany(BundleItem)
Bundle.hasMany(Redeem)
Bundle.belongsToMany(Transaction, { through: TransactionBundle })
Transaction.belongsToMany(Bundle, { through: TransactionBundle })
User.hasMany(Transaction)
User.hasMany(Redeem)

module.exports = {
  User,
  sequelize,
}