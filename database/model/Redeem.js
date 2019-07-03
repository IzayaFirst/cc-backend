module.exports = (sequelize, type) => {
  return sequelize.define('redeem_item', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    redeem_code: {
      unique: true,
      type: type.STRING(100)
    },
    is_redeem: type.BOOLEAN
  } , { underscored: true })
}
