var express = require('express');
var router = express.Router();
const userInterface = require('../interface/User')
/* GET users listing. */
const jwt = require('../helper/jwt')

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', async function(req, res, next) {
  console.log('..')
  const {
    body: {
      username = '',
      password = '',
      first_name,
      surname,
      gender,
      email,
      is_admin = 0, 
    }
  } = req

  if(username.trim().length == 0 || password.trim().length == 0 ) {
    return res.status(422).json({
      "message": 'paramter is invalid.'
    })
  } else {
    try {
      const user = await userInterface.createUser({
        username,
        password,
        first_name,
        surname,
        gender,
        email,
        role: is_admin ? 1 : 0, 
      })
      const token = jwt.sign(user.dataValues)
      return res.status(201).json(Object.assign(user.dataValues, { token }))
    } catch(err) {
      console.log('err', err)
      return res.status(500).json(err)
    }
  }
})

router.post('/login', async function(req, res, next) {
  const {
    body: {
      username = '',
      password = '',
    }
  } = req

  if(username.trim().length == 0 || password.trim().length == 0 ) {
    return res.status(422).json({
      "message": 'paramter is invalid.'
    })
  } else {
    try {
      const user = await userInterface.findUserByUsernameAndPassword({
        username,
        password, 
      })
      if(user && user.dataValues) {
        const token = jwt.sign(user.dataValues)
        return res.status(200).json(Object.assign(user.dataValues, { token }))  
      } else {
        return res.status(404).json({
          message: 'Cannot find username and password'
        })  

      }
      console.log('user', user.dataValues)
    } catch(err) {
      console.log('err', err)
      return res.status(500).json(err)
    }
  }
})

module.exports = router;
