import { Router } from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import {
    registerUsers,
    loginUser,
    postCookies,
    getCookies,
    deleteCookies,
} from '../controllers/controllers/user.controllers.js'

const router = Router()

router.use(cookieParser('secretKey'))
router.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: 'clave',
        cookie: {
            maxAge: 50000,
            // para deployment dejar sameSite : none, secure: true
            sameSite: 'lax',
            secure: false,
            signed: false,
        },
    })
)
router.post(`/register`, registerUsers)
router.post(`/login`, loginUser)
router.post('/cookies', postCookies)
router.get('/cookies', getCookies)
router.delete('/cookies', deleteCookies)

export default router
