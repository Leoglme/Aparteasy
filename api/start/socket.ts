import WsService from 'App/Services/WsService'
WsService.boot()

/**
 * Listen for incoming socket connections
 */
WsService.io.on('connection', (socket) => {
  socket.join(socket.id)

  socket.on('disconnect', () => {
    socket.leave(socket.id)
  })
})
