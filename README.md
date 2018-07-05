# bitchest

Bit Chest. Simple anonymous and temporary file sharing service.

## Install

    > npm install bitchest

## Minimal bit chest app

    const bit = require('bitchest')
    bit.run()

## Configure

You can specify custom PORT and other stuff by passing an options object. Each option is optional and the default values are shown below:

    bit.run({
      title: 'Bit Chest',
      port: 8888,
      uploadDir: path.resolve(\__dirname, '.temp'),
      maxFileSize: 1048576 // bytes
    })

## Licence

MIT
