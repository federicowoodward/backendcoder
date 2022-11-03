import { Router } from 'express';
import ProductsMongoDAO from "../persistencia/daos/productsMongoDAO.js";
import { mockProducts } from '../persistencia/utils/mocks.js';

const router = Router();
const ProductsMongo = new ProductsMongoDAO();

router.get(`/`, async (req, res) => {
    const products = await ProductsMongo.getAll()
    if ( products.length !== 0) {
        res.json(products)
    } else {
        res.json({mensaje: "no hay productos actualmente", result: "NO"})
    }
})

router.get(`/:id`, async (req, res) => {
    const id = req.params.id;
    const products = await ProductsMongo.getById(id)
    if ( products == null) {
        res.json({mensaje: "Este producto no existe", result: "NO"})
    } else {
        res.json(products)
    }
})

router.post(`/faker`, async (req, res) => {
    const mockProducto = mockProducts()
    console.log(mockProducto)
    const createdProduct = await ProductsMongo.create(mockProducto)
    res.json({ mensaje: "Producto creado con exito", result: createdProduct })
})

router.post(`/`, async (req, res) => {
    const createdProduct = await ProductsMongo.create(req.body);
    res.json({mensaje: "Producto creado con exito!", id :createdProduct._id})
})

router.put(`/:id`, async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const updatedProduct = await ProductsMongo.update(id, data)
    res.json({mensaje: "Producto actualizado con exito!", udapte: updatedProduct});
})  

router.delete(`/:id`, async (req, res) => {
    const id = req.params.id;
    const deleteProduct = await ProductsMongo.delete(id)
    try {
        res.json({mensaje: "Producto eliminado con exito!", deleteProduct : deleteProduct})
    } catch (err) {
        console.log(err)
    }
})

export default router;
