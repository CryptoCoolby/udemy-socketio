let socket = io()

// socket.on('connect', function () {
//
//
//     // socket.emit('createMessage', {
//     //     from: 'Frank',
//     //     text: 'hi'
//     // }, function (data) {
//     //     console.log(data)
//     // })
// })
//
// socket.on('disconnect', function () {
// })

//----------------------------------
//    SET USERNAME
//----------------------------------

let userNameButton = $('[name=set__name]'),
    userNameTextInput = $('[name=username]')

userNameButton.on('click', function () {
    if (userNameTextInput.val()) {
        $('#input__buttons').html('<button type="button" name="location">Send Location</button><button type="submit" name="send__message__button" value="Submit">Send</button>');

        $('#input__field .hidden').removeClass('hidden')
        $('[name=message]').val('').focus()
        $(userNameTextInput).hide()

        startChat()
    } else {
        alert('Pick a Nickname!')
    }

})

function startChat () {

    socket.emit('greet')
    //----------------------------------
    //    SEND MESSAGE
    //----------------------------------

    $('[name="send__message__button"]').on('click', function (e) {
        let text = $('[name=message]').val()
        if (!text) return
        e.preventDefault()

        let from = $('[name=username]').val()
        socket.emit('createMessage', {from, text}, function (data) {
            $('[name=message]').val('').focus()
        })
    })

    socket.on('newMessage', function (message) {
        console.log('Incoming message:', message)
        let li = $('<li></li>').text(message.from + " says: " + message.text)
        let element = $('#messages').append(li)
        console.log(element)
        console.log(element.prop('scrollHeight'))
        element.scrollTop(element.prop('scrollHeight'))
    })


    //----------------------------------
    // SEND LOCATION
    //----------------------------------

    let locationButton = $('[name=location]')
    locationButton.on('click', function () {
        $('[name=message]').focus()
        if (!navigator.geolocation) return alert('Geolocation not available')

        locationButton.attr('disabled', 'disabled').text('Sending location...')
        navigator.geolocation.getCurrentPosition(function (position) {
            if (!$('[name=username]').val()) return alert('You don\'t have a username')
            let coords = {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
                from: $('[name=username]').val()
            }
            socket.emit('createLocationMessage', coords)
            locationButton.removeAttr('disabled').text('Send location')

        }, function () {
            alert('Something went wrong')
            locationButton.removeAttr('disabled').text('Send location')

        })
    })

    socket.on('newLocationMessage', function (message) {
        let li = $('<li></li>'),
            a = $(`<a></a>`)

        a.attr('href', message.url)
        a.attr('target', '_blank')
        a.text(`${message.from} is currently here.`)

        li.append(a)
        $('#messages').append(li)
    })
}
