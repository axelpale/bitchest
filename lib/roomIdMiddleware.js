
const letters = /^[a-zA-Z]+$/

module.exports = (req, res, next) => {
  const roomId = req.params.room

  if (!roomId || typeof roomId !== 'string') {
    throw new Error('Invalid roomId: ' + roomId)
  }

  // Strip anything but letters to prevent injection
  if (!letters.test(roomId)) {
    return res.sendStatus(404)
  }

  req.roomId = roomId
  return next()
}
