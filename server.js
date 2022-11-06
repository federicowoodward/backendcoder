import express from 'express';
import cors from 'cors';
import routesProducts from './src/routes/routesProducts.js';
import routesCarts from './src/routes/routesCarts.js';
import { dbMN, dbFB } from "./src/persistencia/dbConnect.js";
import cookieParser from 'cookie-parser';
const app = express()

const info = {
    nombre: 'fede',
    apellidos: 'woodward'
}

// config basica:
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get("/cookies", (req, res) => {
    res.cookie(`primeraPrueba`, info.nombre, { maxAge: 15000 }).send(`cokie guardada!`)
})

app.use("/", routesProducts)
app.use("/cart", routesCarts)


const PORT = process.env.PORT || 8080;
const listen = () => {
    app.listen(PORT, () => {
        console.log("--------------------------------------------")
        console.log(`Escuchando en ${PORT}`);
        console.log("--------------------------------------------")
    });
}



// aqui esta la conexion a las bases, ya sea firebase o mongo simplemente comentar y descomentar la variable db.

// let db = "mongo"
let db = "firebase"
try {
    if (db === "mongo") {
        await dbMN()
        console.log("Connected to mongo")
        listen()
    } else if (db === "firebase") {
        await dbFB()
        console.log("Connected to firebase")
        listen()
    }
}
catch (e) {
    console.log(e);
}