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
      title: 'File Chest',
      roomWord: 'Chest',
      port: 8888,
      uploadDir: path.join(\__dirname, '.temp'),
      maxFileSize: 1048576, // bytes
      poweredBy: true
    })

## Tech

- [Express.js](https://expressjs.com/)
- [Multer](https://github.com/expressjs/multer)
- [Bootstrap](https://getbootstrap.com/)

## Licence

[MIT](LICENSE)
