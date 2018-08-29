const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const _ = require('lodash')

const port = process.env.PORT || 3000
const app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(path.join(__dirname, '..', 'public')))

io.on('connection', (socket) => {
    // console.log('New user connectedo')

    socket.emit('newMessage', {
        from: 'Cool',
        text: 'Welcome to the chat, my friend',
        createdAt: new Date().getTime()
    })

    socket.broadcast.emit('newMessage', {
        from: 'Cool',
        text: 'New user joined',
        createdAt: new Date().getTime()
    })

    socket.on('createMessage', (message) => {
        message = _.pick(message, ['from', 'text'])
        message.createdAt = new Date().getTime()

        io.emit('newMessage', message)
        // socket.broadcast.emit('newMessage', message)

    })

    socket.on('disconnect', () => {
        // console.log('Cliento disconnectedo')
    })
})

server.listen(port, () => {console.log("Now listening on port", port)})
