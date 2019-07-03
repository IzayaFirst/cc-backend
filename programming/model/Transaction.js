module.exports = (sequelize, type) => {
  return sequelize.define('transaction', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      amount: type.DOUBLE,
      price: type.DOUBLE,
      action: type.INTEGER, 
      wallet_id: type.INTEGER,
      currency_id: type.INTEGER,
      // 1 for inbound . 2 for outbound
  } , { underscored: true })
}
