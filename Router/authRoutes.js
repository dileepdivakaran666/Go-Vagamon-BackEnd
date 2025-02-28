const express = require('express')
const {register,login,getUser,logout} = require('../Controller/authController')

const router = express.Router()

router.post('/signup', register)
router.post('/login',login)
router.post('/logout', logout)
router.get('/user', getUser)

module.exports = router