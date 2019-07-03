module.exports = (sequelize, type) => {
  return sequelize.define('items', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      item_name: type.STRING(200),
      item_detail: type.STRING(200),
      item_price: type.DOUBLE,
      sale_date: type.DATE,
      expire_date: type.DATE,
      is_expire: type.BOOLEAN
    } , { underscored: true })
}
