// Administration tools
//
const rootRouter = require('./lib/router')

const path = require('path')
const http = require('http')
const express = require('express')
const fse = require('fs-extra')

// Setup

const optsMiddleware = (opts) => {
  // Way to pass options to handlers
  return (req, res, next) => {
    req.opts = opts
    next()
  }
}

// Interface

exports.run = (opts) => {
  // Arguments

  opts = opts || {}
  opts = Object.assign({
    title: 'File Chest',
    roomWord: 'Chest',
    port: 8888,
    uploadDir: path.join(__dirname, '.temp'),
    maxFileSize: 1048576,
    poweredBy: true
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
    app.use('/static', express.static(path.join(__dirname, 'static')))
    app.use('/', optsMiddleware(opts), rootRouter)

    // Run

    server.listen(opts.port, () => {
      console.log('BitChest listening on port ' + opts.port)
    })
  })
}
