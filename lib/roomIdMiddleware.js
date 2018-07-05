
module.exports = (req, res, next) => {
  const roomId = req.params.room

  if (roomId && typeof roomId === 'string' && roomId.length > 0) {
    req.roomId = roomId
    return next()
  } // else

  throw new Error('Invalid roomId: ' + roomId)
}
