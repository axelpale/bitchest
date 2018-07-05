const fse = require('fs-extra')
const path = require('path')
const ejs = require('ejs')
const status = require('http-status-codes')
const multer = require('multer')

// Setup

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(req.opts.uploadDir, req.roomId)
    fse.ensureDir(dest, (err) => {
      if (err) {
        return cb(err)
      }
      return cb(null, dest)
    })
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

// Precompile
const precompile = (filename) => {
  const p = path.resolve(__dirname, filename)
  const f = fse.readFileSync(p, 'utf8')
  return ejs.compile(f)
}

const template = precompile('template.ejs')

// Handlers

exports.show = (req, res) => {
  const roomDir = path.join(req.opts.uploadDir, req.roomId)

  fse.readdir(roomDir, (err, files) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Dir does not exist. Create at first upload, not earlier.
        files = []
      } else {
        console.error(err)
        return res.sendStatus(status.INTERNAL_SERVER_ERROR)
      }
    }

    return res.send(template({
      roomId: req.roomId,
      opts: req.opts,
      files: files
    }))
  })
}

exports.upload = (req, res) => {
  const multerOpts = {
    storage: storage,
    limits: {
      fileSize: req.opts.maxFileSize // bytes
    }
  }

  const uploader = multer(multerOpts).array('files')

  uploader(req, res, (err) => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.sendStatus(status.REQUEST_TOO_LONG)
      }
      console.error(err)
      return res.sendStatus(status.INTERNAL_SERVER_ERROR)
    }

    if (!req.files) {
      return res.status(status.BAD_REQUEST).send('A file is required')
    }

    res.redirect(303, '/' + req.roomId + '?msg=Success')
  })
}
