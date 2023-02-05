import ProductsMongoDAO from '../daos/productsMongoDAO.js'

export class ProductsDtos {
    constructor() {
        this.productsMongo = new ProductsMongoDAO()
    }

    async getProducts() {
        let products = await this.productsMongo.get()
        if (products.length !== 0) {
            return products
        } else {
            return 'no hay productos'
            // return errorFactory.getError("no hay productos actualmente");
        }
    }

    async getProduct(id) {
        let product = await this.productsMongo.get(id)
        return product
            // return errorFactory.getError("no hay productos actualmente");
    }

    async createProduct(product) {
        let productCreated = await this.productsMongo.create(product)
        return productCreated
    }

    async udapteProduct(id, product) {
        let updatedProduct = await this.productsMongo.update(id, product)
        return updatedProduct
    }

    async deleteProduct(id) {
        let productDeleted = await this.productsMongo.delete(id)
        return productDeleted
    }
}
