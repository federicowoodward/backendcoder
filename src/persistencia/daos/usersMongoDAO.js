import { MongoClass } from "../contenedor/Mongoclass.js";
import { usersModel } from "../models/modelUser.js"
import mongoose from "mongoose";


class UsersMongoDAO extends MongoClass {
    constructor() {
        super(usersModel);
    }

    async searchUser(user) {
        return this.collection.find( {name: String(user.name)})
    }

}

export default UsersMongoDAO;