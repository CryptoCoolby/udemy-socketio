const expect = require('expect')

const {generateMessage, generateLocationMessage} = require('./message')

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

describe('generateLocationMessage', () => {

    it('should generate correct location object', () => {
        let coords = {
            from: 'Coolby',
            latitude: 47,
            longitude: 19
        },
            message = generateLocationMessage(coords)

            expect(message.from).toBe('Coolby')
            expect(message.url).toBe('https://www.google.com/maps/?q=47,19')
            expect(message.createdAt).toBeGreaterThan(new Date().getTime() - 1000)
            expect(message.createdAt).toBeLessThanOrEqual(new Date().getTime())
    })
})
