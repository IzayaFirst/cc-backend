module.exports = (sequelize, type) => {
  return sequelize.define('currency', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      currency_name: type.DOUBLE,
      current_exchange_balance: type.DOUBLE,
    } , { underscored: true })
}
