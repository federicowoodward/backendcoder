import UsersMongoDAO from "../daos/usersMongoDAO.js";

const UsersMongo = new UsersMongoDAO();

const registerUsers = async (req, res) => {
    const user = req.body
    const userCreated = await UsersMongo.createPassword(user)
    res.send({ "status": "created", "extra": { userCreated } })
}

const loginUser = async (req, res) => {
    const user = req.body
    const loginUser = await UsersMongo.searchUser(user)
    if (loginUser.length === 0) {
        res.send({ "status": "error", "error": "user" })
    } else {
        let compare = UsersMongo.comparePassword(user.password, loginUser[0].password)
        if (compare) {
            res.send({ "status": "correct" })
        } else if (!compare) {
            res.send({ "status": "error", "error": "password" })
        }
    }
}

const postCookies = (req, res) => {
    const name = req.body.name
    try {
        req.session.name = name;
        req.session.rol = "admin";
        res.send({ message: "saves", rol: req.session.rol }).status(201)
    } catch (err) {
        console.log(err)
    }
}

const getCookies = (req, res) => {
    try {
        console.log(req.session)
        if (req.session.name !== undefined && req.session.rol !== undefined) {
            res.send({ user: req.session.name, rol: req.session.rol });
        } else {
            res.send("empty")
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

const deleteCookies = (req, res) => {
    try {
        req.session.destroy(function () {
        })
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

export { registerUsers, loginUser, postCookies, getCookies, deleteCookies};
