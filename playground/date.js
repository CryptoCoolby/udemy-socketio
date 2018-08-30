const moment = require('moment')

let timeStamp = moment()

console.log(timeStamp.add(18, 'hour').format('LT'))
