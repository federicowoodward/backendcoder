import express from 'express';
import cors from 'cors';
import routesProducts from './src/routes/routesProducts.js';
import routesCarts from './src/routes/routesCarts.js';
import { dbConnect } from "./src/persistencia/dbConnect.js";
const servidor = express()


// config basica:
servidor.use(cors());
servidor.use(express.json())
servidor.use(express.urlencoded({ extended: true }))

//  rutas inicializar:
servidor.use("/", routesProducts)
servidor.use("/cart", routesCarts)

const PORT = process.env.PORT || 8080;

try {
    await dbConnect()
    console.log("Connected to database")

    servidor.listen(PORT, () => {
        console.log("--------------------------------------------")
        console.log(`Escuchando en ${PORT}`);
        console.log("--------------------------------------------")
    });

} catch (e) {
    console.log(e);
}

