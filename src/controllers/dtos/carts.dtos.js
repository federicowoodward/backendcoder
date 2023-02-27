import CartsMongoDAO from '../daos/cartsMongoDAO.js'
import errorFactory from '../factory/error.factory.js'

export class CartsDtos {
    constructor() {
        this.cartsMongo = new CartsMongoDAO()
    }

    async getCarts(id) {
        let cart = await this.cartsMongo.get(id)
        if (cart.length !== 0) {
            return cart
        } else {
            return { mensaje: 'no hay productos actualmente', result: 'NO' }
        }
    }

    async createCart(products, user) {
        let new_cart = { productos: products, user: user }
        let cheking_if_cart_exist = await this.cartsMongo.getByKey("user", user)
        if (cheking_if_cart_exist.length !== 0 && cheking_if_cart_exist[0].user === String(user)) {
            return { result: 'udapted', update:  this.updateCart(products, user) }
        } else {
            let created = await this.cartsMongo.create(new_cart)
            return { result: 'created', id_created: created._id }
        }
    }

    async updateCart(products, user) {
        let old_cart = await this.cartsMongo.getByKey("user", user)
        let productos_to_update = [...old_cart[0].productos, ...products]
        let udapte = await this.cartsMongo.update(old_cart[0]._id.toHexString(), productos_to_update, "productos")
        return udapte 
    }

    async deleteCart(user) {
        let old_cart = await this.cartsMongo.getByKey("user", user)
        let deleted = await this.cartsMongo.delete(old_cart[0]._id.toHexString())
        return deleted
    }
}
