module.exports = (sequelize, type) => {
  return sequelize.define('transaction', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    transaction_code: {
      type: type.STRING(100),
      unique: true,
    },
  } , { underscored: true })
}
