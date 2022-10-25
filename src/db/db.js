const mongoose = require("mongoose");
const productsModels = require("../products/products.js");
// url de atlas, produccion
// const URL = "mongodb+srv://admin:unodostres456SIETEOCHONUEVE@cluster0.7st1wah.mongodb.net/?retryWrites=true&w=majority"
// url local para hacer pruebas rapidas 
const URL = "mongodb://127.0.0.1:27017/eccomerce"

async function dbMongoose(){
    mongoose.connect(URL)
    
    mongoose.connection.on(`open`, () => {
    console.log("base de datos conectada")
    })

    mongoose.connection.on(`error`, (err) => {
        console.log("Error en la conexion" + err)
    })
        
    const products = await productsModels.find({}, {nombre:1, _id:0})
    console.log(products)

    // const product1 = {name:"Celular",price:4900,stock:20}
    // const productsSchema = new productsModels(product1)
    // const productsCreated = await productsSchema.save()
    // console.log(productsCreated)





  }
  // dbMongoose()

var admin = require("firebase-admin");

var serviceAccount = require("./key.json");
try {

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  }); 
  console.log("base lista!")
  
} catch (e) {
  console.log(e)
}

async function CRUD() {
  const db = admin.firestore()
  const query = db.collection("prueba")

  try {
    const doc = query.doc()
    await doc.create( { nombre: `fede`, dni: 44403230 })
    console.log("datos insertados, id:" + doc)
  } catch(e) {
    console.log(e)
  }
}
// CRUD()