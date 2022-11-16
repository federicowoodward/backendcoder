import { Router } from 'express';
import UsersMongoDAO from "../persistencia/daos/usersMongoDAO.js";

const router = Router();
const UsersMongo = new UsersMongoDAO();

router.post(`/register`, async (req, res) => {
   const user = req.body
   const userCreated = await UsersMongo.create(user)
   res.send({ "status": "created", "extra": { userCreated}})
})

router.post(`/login`, async (req, res) => {
    const user = req.body
    const loginUser = await UsersMongo.searchUser(user)
    if (loginUser.length === 0)  {
        res.send({ "status": "error", "error": "user"})
    } else {
        if (loginUser[0].password === user.password) {
            res.send({ "status": "correct" })
        } else {
            res.send({ "status": "error", "error": "password"})
        }
    }
        
})

export default router;
