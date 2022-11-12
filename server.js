import express from 'express';
import cors from 'cors';
import routesProducts from './src/routes/routesProducts.js';
// import routesCarts from './src/routes/routesCarts.js';
import { dbMN } from "./src/persistencia/dbConnect.js";
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
app.use(cookieParser("secretKey"))

app.get("/cookies", (req, res) => {
    // const data = req.body
    res.cookie(`primeraPrueba`, info.nombre, { maxAge: 600000 }).send(`cokie guardada!`)
})

app.use("/", routesProducts)
// app.use("/cart", routesCarts)


const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    await dbMN()
    console.log("--------------------------------------------")
    console.log(`Escuchando en ${PORT}`);
    console.log("--------------------------------------------")
});



