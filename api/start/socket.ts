import WsService from 'App/Services/WsService'
WsService.boot()

/**
 * Listen for incoming socket connections
 */
WsService.io.on('connection', (socket) => {
  socket.on('notify:success', (data) => {
    socket.emit('notify:success', data)
  })
  socket.on('notify:error', (data) => {
    socket.emit('notify:error', data)
  })
})
