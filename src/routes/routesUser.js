import { Router } from 'express';
import UsersMongoDAO from "../persistencia/daos/usersMongoDAO.js";
import cookieParser from 'cookie-parser';
import session from 'express-session';

const router = Router();
const UsersMongo = new UsersMongoDAO();

router.post(`/register`, async (req, res) => {
   const user = req.body
   const userCreated = await UsersMongo.createPassword(user)
   res.send({ "status": "created", "extra": { userCreated}})
})

router.post(`/login`, async (req, res) => {
    const user = req.body
    const loginUser = await UsersMongo.searchUser(user)
    if (loginUser.length === 0)  {
        res.send({ "status": "error", "error": "user"})
    } else {
        let compare = UsersMongo.comparePassword(user.password, loginUser[0].password)
        if (compare) {
            res.send({ "status": "correct" })
        } else if (!compare) {
            res.send({ "status": "error", "error": "password"})
        }
    }
        
})

router.use(cookieParser("secretKey"))
router.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: "session",
        cookie: {
            maxAge: 600000,
            // para deployment dejar sameSite : none, secure: true
            sameSite: "lax",
            secure: false,
            signed: false
        },
    })
)

router.post("/cookies", (req, res) => {
    const { name } = req.body
    try {
        req.session.user = name;
        res.send({ message: "saves" }).status(201)
    } catch (err) {
        console.log(err)
    }
})


router.get("/getcookies", async (req, res) => {
    try {
        res.send({ data: req.session });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


router.delete("/deletecookies", async (req, res) => {
    try {
        req.session.destroy(function (){
        })
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


export default router;
