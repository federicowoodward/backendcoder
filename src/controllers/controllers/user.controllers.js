import logger from '../../utils/logger.js'
import { UsersDtos } from '../dtos/users.dtos.js'
import errorFactory from '../factory/error.factory.js'

const usersDtos = new UsersDtos()

const registerUsers = async (req, res) => {
    const userCreated = await usersDtos.createUser(req.body)
    res.send({ status: 'created', extra: { userCreated } })
}

const loginUser = async (req, res) => {
    const loginUser = await usersDtos.validateUser(req.body)
    if (loginUser.status === 'error') {
        res.send(loginUser)
    } else if (loginUser.status === 'correct') {
        // session
        for (const key in req.body) {
            req.session[key] = req.body[key]
        }
        if (req.body.name === "fede") {
            req.session["rol"] = "admin"
        }
        const cookie_without_password = () => {
            delete req.session.password
            return req.session
        }
        res.send({"status": loginUser.status, 'data': cookie_without_password() })
    }
}
const deleteUser = async (req, res) => {
    const deletedUser = await usersDtos.deleteUser(req.body)
    res.send(deletedUser)
}

const checkUserSession = async (req, res) => {
    res.send(req.session)
}















// const postCookies = (req, res) => {
//     const name = req.body.name
//     try {
//         req.session.name = name
//         req.session.rol = 'admin'
//         res.send({ message: 'saves', rol: req.session.rol }).status(201)
//     } catch (err) {
//         logger.error(err)
//         res.json(errorFactory.getError(err))
//     }
// }

// const getCookies = (req, res) => {
//     try {
//         console.log(req.session)
//         if (req.session.name !== undefined && req.session.rol !== undefined) {
//             res.send({ user: req.session.name, rol: req.session.rol })
//         } else {
//             res.send('empty')
//         }
//     } catch (error) {
//         logger.error(err)
//         res.json(errorFactory.getError(err))
//     }
// }

// const deleteCookies = (req, res) => {
//     try {
//         req.session.destroy(function () {})
//     } catch (error) {
//         logger.error(err)
//         res.json(errorFactory.getError(err))
//     }
// }

export {
    registerUsers,
    loginUser,
    // postCookies,
    // getCookies,
    // deleteCookies,
    deleteUser,
    checkUserSession
}
