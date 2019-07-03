module.exports = (sequelize, type) => {
  return sequelize.define('currency_history', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      currency_price: type.DOUBLE,
      currency_id: type.INTEGER,
    } , { underscored: true })
}
