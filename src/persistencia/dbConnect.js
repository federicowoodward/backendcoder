import mongoose from "mongoose";
import serviceAccount from "./key.json" assert { type: "json"};
// para dejar mas separado el warnign de node en la consola:
console.log("")
console.log("")
import admin from "firebase-admin"

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


export async function dbFB() {
    try {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } catch (e) {
        console.log(e)
    }
}
