import UsersMongoDAO from '../daos/usersMongoDAO.js'
import errorFactory from '../factory/error.factory.js'

export class UsersDtos {
    constructor() {
        this.usersMongo = new UsersMongoDAO()
    }

    async createUser(data) {
        let user = await this.usersMongo.createUser(data)
        return user
    }
    
    async validateUser(user) {
        let validate = this.usersMongo.searchUser(user.name)
        if (validate.length === 0) {
            return errorFactory.getStatusError('error', 'user')
        } else if (user.password === validate.password) {
            return { status: 'correct' }
        } else {
            return errorFactory.getStatusError('error', 'password')
        }
    }
    
    async deleteUser(data) {
        let deleted = await this.usersMongo.delete(data)
        return deleted
    }
}
