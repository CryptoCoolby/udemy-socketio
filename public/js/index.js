let socket = io()

socket.on('connect', function () {


})
//
// socket.on('disconnect', function () {
// })

//----------------------------------
//    LAUNCH CHAT
//----------------------------------

let userNameButton = $('[name=set__name]'),
    userNameTextInput = $('[name=username]'),
    // userName = "He breasdsadads sadsdd sdsad dasd asdasdas dsadsdd sdsad dasd asdasdas dsadsddd asdasdas dsadsdd sdsad dasd asdasdas dsadsdd sdsad dasd asdasdas dasdadad w",
    // privateRoom = "hahahihi"
    // startChat()
    userName,
    privateRoom

userNameButton.on('click', function (e) {
    e.preventDefault()
    userName = userNameTextInput.val().trim()
    if (typeof userName === 'string' && userName.length > 0) {
        privateRoom = $('[name=roomname]').val().trim()
        startChat()
    } else {
        userNameTextInput.focus()
        userNameTextInput.addClass('redBorder')
    }
})


//----------------------------------
//    GO FOR PRIVATE ROOM
//----------------------------------

$('[name=private]').on('click', function () {
    $(this).hide(300)
    $('[name=roomname]').show(300).focus()
})

function startChat () {

    let params = {userName, privateRoom}
    socket.emit('join', params, function (err) {
        if (err) {

        } else {

        }
    })

    $('#enter__chat').hide()
    $('#message__form').show()
    $('#user__list').addClass('user__list__class')
    $('body').removeClass('center__content')

    $('body').css('overflow', 'hidden')

    $('[name=message]').focus()


    //----------------------------------
    //    UPDATE USERLIST
    //----------------------------------

    socket.on('updateUserList', (users) => {
        let ul = $('<ul></ul>')

        for (var user of users) {
            ul.append($('<li></li>').text(user))
        }

        $('#user__list div:last-child').html(ul)
    })


    //----------------------------------
    //    SEND MESSAGE
    //----------------------------------

    $('[name="send__message__button"]').on('click', function (e) {
        let text = $('[name=message]').val()
        e.preventDefault()
        $('[name=message]').val('').focus()
        if (!text) return

        socket.emit('createMessage', {from: userName, text}, function (data) {
        })
    })

    socket.on('newMessage', function (message) {
        let template = $('#message-template').html(),
            html = Mustache.render(template, {
                from: message.from,
                text: message.text,
                time: moment(message.createdAt).format('h:mm a')
            })

        $('#message__box').append(html)
        scrollToBottom()

    })


    //----------------------------------
    // SEND LOCATION
    //----------------------------------

    let locationButton = $('[name=location]')
    locationButton.on('click', function () {
        $('[name=message]').focus()
        if (!navigator.geolocation) return alert('Geolocation not available')

        locationButton.attr('disabled', 'disabled').text('Processing...')
        navigator.geolocation.getCurrentPosition(function (position) {
            if (!$('[name=username]').val()) return alert('You don\'t have a username')
            let coords = {
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
                from: userName
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

        $('#message__box').append(html)
        scrollToBottom()
    })
}

//----------------------------------
//    SCROLL CHATBOX TO BOTTOM
//----------------------------------

function scrollToBottom () {
    let messageBox = $('#message__box'),
        newMessage = $('#message__box li:last-child'),
        clientHeight = messageBox.prop('clientHeight'),
        scrollTop = messageBox.prop('scrollTop'),
        scrollHeight = messageBox.prop('scrollHeight'),
        newMessageHeight = newMessage.innerHeight(),
        lastMessageHeight = newMessage.prev().innerHeight()

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messageBox.scrollTop(scrollHeight)
    }
}
