class Users {
    constructor () {
        this.users = [];
    }
    addUser ({id, userName, privateRoom}) {
        let user = {id, userName, privateRoom}
        this.users.push(user)
        return user
    }
    removeUser (id) {
        let removed
        this.users = this.users.filter((user) => {
            if (user.id === id) {
                removed = user
                return false
            }
            return true
        })
        return removed
    }
    getUser (id) {
        return this.users.filter(user => user.id === id)
    }
    getUserList (privateRoom) {
        let users = this.users.filter((user) => {
            return user.privateRoom === privateRoom
        })

        return users.map((user) => {
            return user.userName
        })
    }
}

// class Person {
//     constructor ({name, age}) {
//         this.name = name
//         this.age = age
//     }
//     getUserDescription () {
//         return `${this.name} is ${this.age} year(s) old`
//     }
// }
//
// let me = new Person({name: 'Dani',age: 'Hey'})
// let desc = me.getUserDescription()
// console.log(desc)

module.exports = {Users}
