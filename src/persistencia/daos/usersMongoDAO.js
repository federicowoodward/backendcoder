import { MongoClass } from "../contenedor/Mongoclass.js";
// import { usersModel } from "../models/user.js"

class UsersMongoDAO extends MongoClass {
    constructor() {
        super(usersModel);
    }
}

export default UsersMongoDAO