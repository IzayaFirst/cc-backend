module.exports = (sequelize, type) => {
  return sequelize.define('user', {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: type.STRING(200),
      password: type.STRING(200),
      first_name: type.STRING(200),
      surname: type.STRING(200),
      gender: type.INTEGER,
      email: type.STRING(200),
      role: type.INTEGER, // 0 for admin . 1 for others
  } , { underscored: true })
}
