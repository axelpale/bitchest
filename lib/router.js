const handlers = require('./handlers')
const roomIdMiddleware = require('./roomIdMiddleware')
const roomRouter = require('./room/router')
const express = require('express')

// Setup

const router = express.Router()

// Routes

router.get('/', handlers.index)
router.post('/', handlers.create)

router.use('/:room', roomIdMiddleware, roomRouter)

module.exports = router
