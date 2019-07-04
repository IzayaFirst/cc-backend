module.exports = (sequelize, type) => {
  return sequelize.define('user', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: type.STRING(200),
        unique: true,
      },
      password: type.STRING(200),
      first_name: type.STRING(200),
      surname: type.STRING(200),
      gender: type.INTEGER,
      email: type.STRING(200),
      role: type.INTEGER, // 1 for admin . 0 for others
  } , { underscored: true })
}
