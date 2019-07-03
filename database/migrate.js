const DB = require('./model')

DB.sequelize.sync({ force: true })
.then(() => {
  console.log(`Database & tables created!`)
})