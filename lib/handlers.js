const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const lorem = require('random-lorem')
const pjson = require('../package.json')

// Setup

// Precompile
const precompile = (filename) => {
  const p = path.resolve(__dirname, filename)
  const f = fs.readFileSync(p, 'utf8')
  return ejs.compile(f)
}

const template = precompile('template.ejs')

// Handlers

exports.index = (req, res) => {
  res.send(template({
    opts: req.opts,
    homeUrl: pjson.homepage
  }))
}

exports.create = (req, res) => {
  const roomId = lorem({ syllables: 4 })
  res.redirect(303, '/' + roomId)
}
