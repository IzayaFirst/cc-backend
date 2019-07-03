const jwt = require('../helper/jwt')

module.exports = async (req, res, next) => {
  const {
    headers: {
      authorization,
    }
  } = req
  if(authorization || authorization.trim().length > 0) {
    try {
      const data = await jwt.unsign(authorization)
      if(data && data.id && data.role == 0) {
        req.userId = data.id
        next()
      } else {
        return res.status(401).json({
          message: 'Authorization required.'
        })
      }
    } catch(err) {
      return res.status(401).json({
        message: 'Authorization required.'
      })
    }
  } else {
    return res.status(401).json({
      message: 'Authorization required.'
    })
  }
}

