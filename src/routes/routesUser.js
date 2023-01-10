import { Router } from 'express';
import UsersMongoDAO from "../controllers/daos/usersMongoDAO.js";
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
        secret: "clave",
        cookie: {
            maxAge: 10000,
            // para deployment dejar sameSite : none, secure: true
            sameSite: "lax",
            secure: false,
            signed: false,
        },
    })
)

router.post("/cookies", (req, res) => {
    const name = req.body.name
    console.log(name)
    try {
        req.session.name = name;
        req.session.rol = "admin";
        res.send({ message: "saves", rol: req.session.name }).status(201)
    } catch (err) {
        console.log(err)
    }
})


router.get("/cookies", async (req, res) => {
    try {
        if (req.session.name !== undefined && req.session.rol !== undefined) {
            res.send({ user: req.session.name , rol: req.session.rol });
        } else {
            res.send("empty")
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


router.delete("/cookies", async (req, res) => {
    try {
        req.session.destroy(function (){
        })
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


export default router;
