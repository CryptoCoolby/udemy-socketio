let socket = io()

socket.on('connect', function () {
    console.log('Connectedo succesfulee')

    socket.emit('createMessage', {
        from: 'clientCool',
        text: 'Howdie?'
    })
})

socket.on('disconnect', function () {
    console.log('Disconnectedo unluckilee')
})

socket.on('newMessage', function (message) {
    console.log('Incoming message:', message)
})
