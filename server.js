import express from 'express';
import cors from 'cors';
import routesProducts from './src/routes/routesProducts.js';
import routesCarts from './src/routes/routesCarts.js';
import routesUser from './src/routes/routesUser.js';
import routeInfo from './src/routes/routeInfo.js';
import routerRandoms from './src/routes/routerRandoms.js';
import { dbMN } from "./src/persistencia/dbConnect.js";
import './src/persistencia/headers/header.js';
import config from './src/config/config.js'; 
import logger from './src/persistencia/utils/logger.js';
import compression from 'compression';

const app = express()

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.set("trust proxy", 1);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(compression())

// app.use("/", routesProducts)
app.use("/users", routesUser)
app.use("/info", routeInfo)
app.use("/api", routerRandoms)
// app.use("/cart", routesCarts)

const PORT = config.PORT || 8080;

app.listen(PORT, async () => {
    await dbMN()
    logger.info(`Escuchando en ${PORT}`)
    logger.error(`aaa`)
    logger.warn("hola");
});