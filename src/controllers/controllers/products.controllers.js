import { client } from '../../utils/twilio.js'
import errorFactory from '../factory/error.factory.js'
import logger from '../../utils/logger.js'
import { ProductsDtos } from '../dtos/products.dtos.js'
import createHelper from '../helpers/createProduct.helper.js'

const productsDtos = new ProductsDtos()

const getProducts = async (req, res) => {
    const products = await productsDtos.getProducts()
    res.send(products)
}

const getProductById = async (req, res) => {
    const id = req.params.id
    const products = await productsDtos.getProduct(id)
    res.json(products)
}

const createProduct = async (req, res) => {
    let product = createHelper(req.body)
    const createdProduct = await productsDtos.createProduct(product)
    res.json({ mensaje: 'Producto creado con exito!', id: createdProduct._id })
}

const udapteProduct = async (req, res) => {
    const id = req.params.id
    const data = req.body
    const updatedProduct = await ProductsMongo.update(id, data)
    res.json({
        mensaje: 'Producto actualizado con exito!',
        udapte: updatedProduct,
    })
}

const deleteProduct = async (req, res) => {
    const id = req.params.id
    const deleteProduct = await productsDtos.deleteProduct(id)
    try {
        res.json({
            mensaje: 'Producto eliminado con exito!',
            deleteProduct: deleteProduct,
        })
    } catch (err) {
        logger.error(err)
        res.json(errorFactory.getError(err))
    }
}

const createTwilioClient = async () => {
    const { num } = req.body
    try {
        await client.messages.create({
            body: 'prueba twilio wsp',
            from: 'whatsapp:+14155238886',
            to: `whatsapp:+${num}`,
        })
        res.send('mensaje enviado')
    } catch (err) {
        if ((err.code = '21211')) {
            res.send(
                errorFactory.getError(
                    'este numero no es valido, revisa las reglas para escribir tu numero.'
                )
            )
        } else {
            logger.error(err)
            res.json(errorFactory.getError(err))
        }
    }
}

export {
    getProducts,
    getProductById,
    createProduct,
    udapteProduct,
    deleteProduct,
    createTwilioClient,
}
