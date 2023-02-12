import UsersMongoDAO from "../daos/usersMongoDAO.js";

export class UsersDtos {
    constructor() {
        this.usersMongo = new UsersMongoDAO()
    }

    async createPassword(data) {
        let password = await this.usersMongo.createPassword(data);
        return password;
    } 

    comparePassword(password, hash) {
        let compare = this.usersMongo.comparePassword(password, hash);
        return compare
    }

    async searchUser(user) {
        return this.usersMongo.searchUser(user);
    }
}

