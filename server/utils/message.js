const moment = require('moment')

let generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
}

let generateLocationMessage = (coords) => {
    return {
        from: coords.from,
        url: `https://www.google.com/maps/?q=${coords.latitude},${coords.longitude}`,
        createdAt: moment().valueOf()

    }
}

module.exports = {generateMessage, generateLocationMessage}
