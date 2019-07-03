const jwt = require('jsonwebtoken')
const key = 'hello_world'

const sign = (data) => jwt.sign(data, key, {
  expiresIn: '1d'
})

const unsign = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, key, function (err, decoded) {
      if (err) {
        reject(err)
      } else {
        resolve(decoded)
      }
    });
  })
}

module.exports = {
  sign,
  unsign,
}