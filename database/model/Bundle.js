module.exports = (sequelize, type) => {
  return sequelize.define('bundle', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      bundle_name: type.STRING(100),
      bundle_price: type.DOUBLE,
    } , { underscored: true })
}
