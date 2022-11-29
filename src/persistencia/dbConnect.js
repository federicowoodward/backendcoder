import mongoose from "mongoose";
import config from "./../config/config.js";

export async function dbMN() {
    try {
        const URL = config.DB
        
        mongoose.connect(URL)

        mongoose.connection.on(`error`, (err) => {
            console.log("Error en la conexion: " + err)
        })
    } catch (e) {
        console.log(e)
    }

}
