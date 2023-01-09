import { Router } from 'express';
import CartsMongoDAO from '../controllers/daos/cartsMongoDAO.js';

const router = Router();
const cartsMongo = new CartsMongoDAO();

router.get(`/`, async (req, res) => {
    const cart = await cartsMongo.getAll()
    if (cart.length !== 0) {
        res.json(cart)
    } else {
        res.json({ mensaje: "no hay productos actualmente", result: "NO" })
    }
})

router.post(`/`, async (req, res) => {
    const cart = req.body
    cart.productos = []
    const createdProduct = await cartsMongo.create(cart);
    res.json({ mensaje: "Producto creado con exito!", id: createdProduct._id })
})

export default router;
