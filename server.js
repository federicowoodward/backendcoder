import express from 'express';
import cors from 'cors';
import routesProducts from './src/routes/routesProducts.js';
import routesCarts from './src/routes/routesCarts.js';
import routesUser from './src/routes/routesUser.js';
import routeInfo from './src/routes/routeInfo.js';
import { dbMN } from "./src/persistencia/dbConnect.js";
import config from './src/persistencia/config/config.js'; 
import logger from './src/utils/logger.js';
import compression from 'compression';

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.set("trust proxy", 1)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())


app.use("/products", routesProducts)
app.use("/users", routesUser)
app.use("/info", routeInfo)
app.use("/cart", routesCarts)

let PORT;
if (config.MODO === "DEV") {
    PORT = 8080
} else if (config.MODO === "PROD") {
    PORT = process.env.PORT
}

app.listen(PORT, async () => {
    logger.info(`Escuchando en ${PORT}`)
});