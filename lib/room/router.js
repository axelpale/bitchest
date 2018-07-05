
const h = require('./handlers')
const express = require('express')

// Setup

const router = express.Router()

// Routes

router.get('/', h.show)
router.post('/', h.upload)

module.exports = router
