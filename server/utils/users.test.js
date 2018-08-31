const expect = require('expect')

const {Users} = require('./users')

describe('Users', () => {
    let users

    beforeEach(() => {
        users = new Users()
        users.users = [{id: '1', userName: 'Cool', privateRoom: 'Dicken\'s'}, {id: '2', userName: 'Jelly', privateRoom: 'Ka\'boom'}, , {id: '3', userName: 'Dick', privateRoom: 'Dicken\'s'}]
    })

    it('should add new user', () => {
        let users = new Users()
        user = {id: '123', userName: 'Dani', privateRoom: 'Dicken\'s'}

        let resUser = users.addUser(user)

        expect(users.users).toEqual([user])
    })

    it('should return usernames in different rooms by roomname', () => {
        let userList = users.getUserList('Dicken\'s')
        let userList2 = users.getUserList('Ka\'boom')

        expect(userList).toEqual(['Cool','Dick'])
        expect(userList2).toEqual(['Jelly'])
    })

    it('should give back the user object by id', () => {
        expect(users.getUser('1')).toEqual([{id: '1', userName: 'Cool', privateRoom: 'Dicken\'s'}])
        expect(users.getUser('2')).toEqual([{id: '2', userName: 'Jelly', privateRoom: 'Ka\'boom'}])
    })

    it('should remove (and return) user by id', () => {
        let removed = users.removeUser('1')

        expect(removed).toEqual({id: '1', userName: 'Cool', privateRoom: 'Dicken\'s'})

        expect(users.users).toEqual([{id: '2', userName: 'Jelly', privateRoom: 'Ka\'boom'}, {id: '3', userName: 'Dick', privateRoom: 'Dicken\'s'}])
    })
})
