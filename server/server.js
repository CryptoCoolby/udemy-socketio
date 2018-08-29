const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const _ = require('lodash')
const {generateMessage} = require('./utils/message.js')

const port = process.env.PORT || 3000
const app = express()
let server = http.createServer(app)
let io = socketIO(server)

app.use(express.static(path.join(__dirname, '..', 'public')))


io.on('connection', (socket) => {
    // console.log('New user connectedo')


    socket.emit('newMessage',
    generateMessage('Cool', 'Welcome to the chat, my friend'))

    socket.broadcast.emit('newMessage',
    generateMessage('Cool', 'New user joined!'))


    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text))
        // socket.broadcast.emit('newMessage', message)
        let data = 'Everything went fine'
        callback(data)
    })


    socket.on('disconnect', () => {
        // console.log('Cliento disconnectedo')
    })
})


server.listen(port, () => {console.log("Now listening on port", port)})
