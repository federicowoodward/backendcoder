import { MongoClass } from "../contenedor/Mongoclass.js";
import { usersModel } from "../models/modelUser.js"
import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
        return await new this.collection(dataHash).save()
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