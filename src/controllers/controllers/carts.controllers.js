import { CartsDtos } from "../dtos/carts.dtos.js";

const cartsDtos = new CartsDtos;

async function getCart(req, res){
    const cart = await cartsDtos.getCart(req.body.user)
    res.send(cart)
}

async function createCart(req, res){
    const products = req.body.productos
    const user = req.body.user
    const createdProduct = await cartsDtos.createCart(products, user);
    res.json(createdProduct)
}

async function updateCart(req, res){
    let products = req.body.productos
    let old_cart = req.body.old_cart
    const updateCart = await cartsDtos.updateCart(old_cart, products);
    res.json(updateCart)
}

async function deleteCart(req, res){
    const user = req.body.user
    const deletedCart = await cartsDtos.deleteCart(user);
    res.json(deletedCart)
}

async function order(req, res){
    const data = req.body.data
    const order = await cartsDtos.order(data)
    return order
}

export {
    getCart,
    createCart,
    updateCart,
    deleteCart,
    order
}