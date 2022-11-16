import express from 'express';
import cors from 'cors';
import routesProducts from './src/routes/routesProducts.js';
import routesCarts from './src/routes/routesCarts.js';
import routesUser from './src/routes/routesUser.js';
import { dbMN } from "./src/persistencia/dbConnect.js";
import headersConfiguration from './src/persistencia/headers/header.js';
headersConfiguration()
import cookieParser from 'cookie-parser';
import session from 'express-session';
const app = express()

// config basica:
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.set("trust proxy", 1);
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser("secretKey"))
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: "session",
        cookie: {
            maxAge: 600000,
            // para deployment dejar sameSite : none, secure: true
            sameSite: "lax",
            secure: false,
            signed: false
        },
    })
)

app.post("/cookies", (req, res) => {
    const { name } = req.body
    try {
        req.session.user = name;
        res.send({ message: "saves" }).status(201)
    } catch (err) {
        console.log(err)
    }
})


app.get("/getcookies", async (req, res) => {
    try {
        res.send({ data: req.session });
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});


app.delete("/deletecookies", async (req, res) => {
    try {
        req.session.destroy(function (){
        })
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

// app.use("/", routesProducts)
app.use("/users", routesUser)
// app.use("/cart", routesCarts)


const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    await dbMN()
    console.log("--------------------------------------------")
    console.log(`Escuchando en ${PORT}`);
    console.log("--------------------------------------------")
});



