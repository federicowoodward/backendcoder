import admin from "firebase-admin";
import serviceAccount  from "./key.json" assert { type: "json" };
// experimental

export function dbConnect() {

    try {

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log("Firebase conectado!")

    } catch (e) {
        console.log(e)
    }

}