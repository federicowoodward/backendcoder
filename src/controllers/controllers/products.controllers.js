import ProductsMongoDAO from "../daos/productsMongoDAO.js";
import { client } from "../../utils/twilio.js";

const ProductsMongo = new ProductsMongoDAO();

const getProducts = async (req, res) => {
    const products = await ProductsMongo.get()
    if ( products.length !== 0) {
        res.json(products)
    } else {
        res.json({mensaje: "no hay productos actualmente", result: "NO"})
    }
}

// router.get(`/:id`, async (req, res) => {
const getProductById = async (req, res) => {
    const id = req.params.id;
    const products = await ProductsMongo.get(id)
    if ( products == null) {
        res.json({mensaje: "Este producto no existe", result: "NO"})
    } else {
        res.json(products)
    }
}
 
// router.post(`/`, async (req, res) => {
const createProduct = async (req, res) => {
     const createdProduct = await ProductsMongo.create(req.body);
    res.json({mensaje: "Producto creado con exito!", id :createdProduct._id})
}
   
// router.put(`/:id`, async (req, res) => {
const udapteProduct = async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const updatedProduct = await ProductsMongo.update(id, data)
    res.json({mensaje: "Producto actualizado con exito!", udapte: updatedProduct});
}

// router.delete(`/:id`, async (req, res) => {
const deleteProduct = async (req, res) => {

    const id = req.params.id;
    const deleteProduct = await ProductsMongo.delete(id)
    try {
        res.json({mensaje: "Producto eliminado con exito!", deleteProduct : deleteProduct})
    } catch (err) {
        console.log(err)
    }
}

// router.post("/twilio", async (req, res) => {
const createTwilioClient = async () => {

    const { num } = req.body;
    try {
        await client.messages.create({
            body: "prueba twilio wsp",
            from:   "whatsapp:+14155238886",
            to: `whatsapp:+${num}`
        })
        res.send("mensaje enviado")
    } catch (err) {
        if (err.code = "21211") {
            res.send("este numero no es valido, revisa las reglas para escribir tu numero.")
        }
        console.log(err)
    }
}

export { getProducts, getProductById, createProduct, udapteProduct, deleteProduct, createTwilioClient }
