module.exports = (sequelize, type) => {
  return sequelize.define('bundle_item', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      price: type.DOUBLE,
    } , { underscored: true })
}
