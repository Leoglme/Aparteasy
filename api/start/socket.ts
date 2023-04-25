import WsService from 'App/Services/WsService'
WsService.boot()

/**
 * Listen for incoming socket connections
 */
WsService.io.on('connection', (socket) => {
  socket.join(socket.id)

  socket.on('notify:success', (data) => {
    socket.to(socket.id).emit('notify:success', data)
  })
  socket.on('notify:error', (data) => {

    socket.to(socket.id).emit('notify:error', data)
  })
})
