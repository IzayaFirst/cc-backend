const DB = require('../model')
const sha1 = require('sha1')

function createUser({ 
  username,
  password,
  first_name,
  surname,
  gender,
  email,
  role, 
}) { 
  return DB.User.create({
    username,
    password: sha1(password),
    first_name,
    surname,
    gender,
    email,
    role, 
  })
}

function findUserByUsernameAndPassword({ 
  username,
  password,
}) { 
  return DB.User.findOne({
    where: {
      username,
      password: sha1(password),
    }
  })
}

module.exports = {
  createUser,
  findUserByUsernameAndPassword,
}