module.exports = (sequelize, type) => {
  return sequelize.define('promotion', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      promotion_name: type.STRING(200),
      promotion_detail: type.STRING(200),
      discount_percent: type.DOUBLE,
      start_date: type.DATE,
      expire_date: type.DATE,
      is_expire: type.BOOLEAN
    } , { underscored: true })
}
