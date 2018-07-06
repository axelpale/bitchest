# bitchest

Bit Chest. Simple anonymous and temporary file sharing service.

![](static/filechest.png)

## Install

    > npm install bitchest

## Minimal bitchest app

    const bit = require('bitchest')
    bit.run()

## Configure

You can specify custom PORT and other stuff by passing an options object. Each option is optional and the default values are shown below:

    bit.run({
      title: 'Bit Chest',
      roomWord: 'File Chest',
      port: 8888,
      uploadDir: path.resolve(\__dirname, '.temp'),
      maxFileSize: 1048576 // bytes
    })

## Licence

MIT
