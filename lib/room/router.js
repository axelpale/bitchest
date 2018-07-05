
const h = require('./handlers')
const express = require('express')

// Setup

const router = express.Router()

// Routes

router.get('/', h.show)
router.post('/', h.upload)
router.post('/clear', h.clear)

module.exports = router
