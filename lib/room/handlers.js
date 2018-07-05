const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const status = require('http-status-codes')

// Setup

// Precompile
const precompile = (filename) => {
  const p = path.resolve(__dirname, filename)
  const f = fs.readFileSync(p, 'utf8')
  return ejs.compile(f)
}

const template = precompile('template.ejs')

// Handlers

exports.show = (req, res) => {
  res.send(template({
    roomId: req.roomId,
    opts: req.opts,
    files: []
  }))
}

exports.upload = (req, res) => {
  res.send('UPLOAD ' + req.roomId)
}
