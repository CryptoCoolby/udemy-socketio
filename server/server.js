const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')
const _ = require('lodash')

const {generateMessage, generateLocationMessage} = require('./utils/message.js')
const {Users} = require('./utils/users.js')

const port = process.env.PORT || 3000
const app = express()
let server = http.createServer(app)
let io = socketIO(server)
let users = new Users()

app.use(express.static(path.join(__dirname, '..', 'public')))


io.on('connection', (socket) => {
    // console.log('New user connectedo')
    let user, room

    socket.on('join', ({userName, privateRoom}) => {
        user = userName
        room = privateRoom

        socket.join(privateRoom)
        users.removeUser(socket.id)
        users.addUser({id: socket.id, userName, privateRoom})

        io.to(room).emit('updateUserList', users.getUserList(room))

        let welcomeText
        if (room) {
            welcomeText = `Welcome to the chat, ${user}! This is private room "${room}".`
        } else {
            welcomeText = 'Greetings, ' + user + '! Welcome to the coolest yadida chill public chat room!'
        }

        socket.emit('newMessage',
        generateMessage('Cool', welcomeText))
        socket.broadcast.to(room).emit('newMessage',
        generateMessage('Cool', `${user} joined the chat!`))
    })


    socket.on('createMessage', (message, callback) => {
        io.to(room).emit('newMessage', generateMessage(message.from, message.text))
        // socket.broadcast.emit('newMessage', message)
        let data = 'Everything went fine'
        callback(data)
    })


    socket.on('createLocationMessage', (coords) => {
        io.to(room).emit('newLocationMessage', generateLocationMessage(coords))

    })


    socket.on('disconnect', () => {
        socket.broadcast.to(room).emit('newMessage',
        generateMessage('Cool', `${user} left the room!`))
        let userObj = users.removeUser(socket.id)
        if (userObj) io.to(room).emit('updateUserList', users.getUserList(room))


        // console.log('Cliento disconnectedo')
    })
})


server.listen(port, () => {console.log("Now listening on port", port)})
