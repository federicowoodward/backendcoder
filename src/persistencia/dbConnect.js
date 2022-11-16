import mongoose from "mongoose";

export async function dbMN() {
    try {
        const URL = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0"
        mongoose.connect(URL)

        mongoose.connection.on(`error`, (err) => {
            console.log("Error en la conexion: " + err)
        })
    } catch (e) {
        console.log(e)
    }

}
