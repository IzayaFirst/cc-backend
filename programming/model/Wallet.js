module.exports = (sequelize, type) => {
  return sequelize.define('wallet', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      wallet_name: type.STRING(200),
      wallet_detail: type.STRING(200),
      user_id: type.INTEGER
  } , { underscored: true })
}
