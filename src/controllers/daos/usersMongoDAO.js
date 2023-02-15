import { MongoClass } from "../contenedor/Mongoclass.js";
import { usersModel } from "../../persistencia/models/modelUser.js"
import logger from '../../utils/logger.js';

class UsersMongoDAO extends MongoClass {
    constructor() {
        super(usersModel);
    }

    async createUser(data) {
        try {
            const userCreated = await new this.collection(data).save()
            return userCreated
        } catch (err) {
            if (err.code === 11000) {
                return "usuario repetido"
            } else {
                logger.error(err)
                return err
            }
        }
    }

    async searchUser(name) {
        return this.collection.find( {name: String(name)})
    }

}

export default UsersMongoDAO;