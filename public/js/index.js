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

socket.on('newLocationMessage', function (message) {
    if (!$('[name=username]').val()) return alert('You don\'t have a username')
    let li = $('<li></li>'),
        a = $(`<a></a>`)

    a.attr('href', message.url)
    a.attr('target', '_blank')
    a.text(`${message.from} is currently here.`)

    li.append(a)
    $('#messages').prepend(li)
})

$('#message-form').on('submit', function (e) {
    e.preventDefault()

    let from = $('[name=username]').val()
    let text = $('[name=message]').val()
    socket.emit('createMessage', {from, text}, function (data) {
        $('[name=message]').val('').focus()
    })
})

let locationButton = $('[name=location]')
locationButton.on('click', function () {
    if (!navigator.geolocation) return alert('Geolocation not available')

    navigator.geolocation.getCurrentPosition(function (position) {
        let coords = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            from: $('[name=username]').val()
        }
        socket.emit('createLocationMessage', coords)
    }, function () {
        alert('Something went wrong')
    })
})
