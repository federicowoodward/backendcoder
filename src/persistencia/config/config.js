import minimist from "minimist"
import doteenv from "dotenv"
doteenv.config()

const options = {
    default: {
        PORT: 8080
    },
    alias: {
        PORT: "p"
    }
}
const config = {
    
    PORT: minimist(process.argv, options).PORT,
    MODO: process.env.MODO || "prod",
    DB: process.env.DB,
    INFO: {
        argumentosEntrada: process.argv,
        sistemaOperativo: process.platform,
        nodeVersion: process.version,
        memoriaTotalReservada: process.memoryUsage().rss,
        path: process.execPath,
        id: process.pid,
        carpetaProyecto: process.env.PWD
    }
}

// console.log(config)
export default config