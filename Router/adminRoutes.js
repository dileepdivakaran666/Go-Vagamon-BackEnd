const express = require('express')
const userList = require('../Controller/adminController')
const {resort, upload} = require('../Controller/adminResortsController')
const {authMiddleware, adminMiddleware} = require('../Middleware/authMiddleware')

const router = express()

router.get('/user',authMiddleware, adminMiddleware, userList )
router.post('/resort',authMiddleware, adminMiddleware, upload.fields([
    { name: 'photos', maxCount: 40 }, // Allow up to 10 photos
    { name: 'videos', maxCount: 5 } // Allow up to 5 videos
  ]), resort )

module.exports = router