const express = require('express')
const {getResorts, getResortDetail} = require('../Controller/resortController')


const router = express.Router()

router.get('/', getResorts)
router.get('/:id', getResortDetail)

module.exports = router