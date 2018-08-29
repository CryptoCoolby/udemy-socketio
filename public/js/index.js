let socket = io()

socket.on('connect', function () {


    // socket.emit('createMessage', {
    //     from: 'Frank',
    //     text: 'hi'
    // }, function (data) {
    //     console.log(data)
    // })
})

socket.on('disconnect', function () {
})

socket.on('newMessage', function (message) {
    console.log('Incoming message:', message)
    let li = $('<li></li>').text(message.from + " says: " + message.text)
    $('#messages').prepend(li)
})

$('#message-form').on('submit', function (e) {
    e.preventDefault()

    let from = $('[name=username]').val()
    let text = $('[name=message]').val()
    socket.emit('createMessage', {from, text}, function (data) {
        console.log(data)
        $('[name=message]').val('')
    })
})
