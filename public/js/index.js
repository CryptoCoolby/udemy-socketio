let socket = io()

socket.on('connect', function () {
    let template = $('#message-template').html(),
        html = Mustache.render(template, {
            from: "Cool",
            text: "Please enter a username",
            time: moment().format('h:mm a')
        })

    $('#message__box').prepend(html)

})
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
    }
})

function startChat () {

    socket.emit('greet', userNameTextInput.val())
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
        let template = $('#message-template').html(),
            html = Mustache.render(template, {
                from: message.from,
                text: message.text,
                time: moment(message.createdAt).format('h:mm a')
            })

        $('#message__box').prepend(html)
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
        let template = $('#location-template').html(),
            html = Mustache.render(template, {
                from: message.from,
                url: message.url,
                time: moment(message.createdAt).format('h:mm a')
            })

        $('#message__box').prepend(html)
    })
}
