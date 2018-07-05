// Administration tools
//
const handlers = require('./lib/handlers')
const roomIdMiddleware = require('./lib/roomIdMiddleware')
const roomRouter = require('./lib/room/router')

const path = require('path')
const http = require('http')
const express = require('express')
const fse = require('fs-extra')

// Setup

const optsMiddleware = (opts) => {
  // Way to pass options to handlers
  return (req, res, next) => {
    req.bitchestOpts = opts
  }
}

// Interface

exports.run = (opts) => {
  // Arguments

  opts = opts || {}
  opts = Object.assign({
    port: 8888,
    uploadDir: path.join(__dirname, '.temp'),
    maxFileSize: 1048576
  }, opts)

  // Setup

  const app = express()
  const server = http.createServer(app)

  fse.ensureDir(opts.uploadDir, (err) => {
    if (err) {
      // Cannot init
      throw err
    }
    // Routes

    app.use(express.static(opts.uploadDir))

    app.get('/', optsMiddleware(opts), handlers.index)
    app.use('/:room', roomIdMiddleware, optsMiddleware(opts), roomRouter)

    // Run

    server.listen(opts.port, () => {
      console.log('BitChest listening on port ' + opts.port)
    })
  })
}
