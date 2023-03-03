import { Router } from 'express'
import session from 'express-session'
import pkg from 'session-file-store'
const sessionFileStore = pkg
const FileStore = sessionFileStore(session)
import {
    registerUsers,
    loginUser,
    // postCookies,
    // getCookies,
    // deleteCookies,
    checkUserSession,
} from '../controllers/controllers/user.controllers.js'

const router = Router()

router.use(
    session({
        secret: 'keySession',
        resave: true,
        saveUninitialized: true,
        store: new FileStore({ path: './sessionFolder' }),
        cookie: {
            maxAge: 1000,
        }
    })
)
router.post(`/`, loginUser)
router.post(`/register`, registerUsers)
router.get(`/session`, checkUserSession)
// router.post('/cookies', postCookies)
// router.get('/cookies', getCookies)
// router.delete('/cookies', deleteCookies)

export default router
