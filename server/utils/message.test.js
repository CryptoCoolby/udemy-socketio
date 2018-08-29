const expect = require('expect')

const {generateMessage} = require('./message')

describe('generateMessage', () => {

    it('should generate the correct message object', () => {
        let from = 'Coolby', text = 'Welcome to the show',
            message = generateMessage(from, text)

        expect(message.from).toBe(from)
        expect(message.text).toBe(text)
        expect(message.createdAt).toBeGreaterThan(new Date().getTime() - 1000)
        expect(message.createdAt).toBeLessThanOrEqual(new Date().getTime())
    })
})
