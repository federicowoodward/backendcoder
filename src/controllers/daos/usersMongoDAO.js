import { MongoClass } from "../contenedor/Mongoclass.js";
import { usersModel } from "../../persistencia/models/modelUser.js"
import bcrypt from "bcrypt";
import logger from '../../utils/logger.js';


class UsersMongoDAO extends MongoClass {
    constructor() {
        super(usersModel);
    }

    async createPassword(data) {
        let passwordHash = await bcrypt.hash(data.password.toString(), 8)
        let dataHash = {
            name: data.name,
            password: passwordHash
        }
        try {
            const userCreated = await new this.collection(dataHash).save()
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

    comparePassword(password, hash) {
        let compare = bcrypt.compareSync(password.toString(), hash.toString())
        return compare
    }

    async searchUser(user) {
        return this.collection.find( {name: String(user.name)})
    }

}

export default UsersMongoDAO;