import UsersMongoDAO from '../daos/usersMongoDAO.js'
import errorFactory from '../factory/error.factory.js'
import { comparePassword, createPassword } from "../helpers/bycript.js"

export class UsersDtos {
    constructor() {
        this.usersMongo = new UsersMongoDAO()
    }

    async createUser(data) {
        let userToCreate = data
        userToCreate.password = await createPassword(data.password)
        let user = await this.usersMongo.createUser(userToCreate)
        return user
    }
    
    async validateUser(user) {
        let dbUser = await this.usersMongo.searchUser(user.name)
        if (dbUser.length === 0) {
            return errorFactory.getStatusError('error', 'user')
        } else if (comparePassword(user.password, dbUser[0].password)) {
            return { status: 'correct', user: dbUser }
        } else {
            return errorFactory.getStatusError('error', 'password')
        }
    }
    
    async deleteUser(data) {
        let deleted = await this.usersMongo.delete(data)
        return deleted
    }
}
