import { Router } from 'express';
import { CartsDtos } from '../controllers/dtos/carts.dtos.js';

const router = Router();
const cartsDtos = new CartsDtos;

router.get(`/`, async (req, res) => {
    const cart = await cartsDtos.getCarts()
    res.send(cart)
})

router.post(`/`, async (req, res) => {
    const products = req.body.productos
    const user = req.body.user
    const createdProduct = await cartsDtos.createCart(products, user);
    res.json(createdProduct)
})

router.put(`/`, async (req, res) => {
    const products = req.body.productos
    const user = req.body.user
    const updateCart = await cartsDtos.updateCart(products, user);
    res.json(updateCart)
})

router.delete(`/`, async (req, res) => {
    const user = req.body.user
    const deletedCart = await cartsDtos.deleteCart(user);
    res.json(deletedCart)
})

export default router;
