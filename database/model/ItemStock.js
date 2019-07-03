module.exports = (sequelize, type) => {
  return sequelize.define('item_stock', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      action: type.INTEGER, // 1 = inbound , 2 = outbound // 
      amount: type.INTEGER, 
    } , { underscored: true })
}
