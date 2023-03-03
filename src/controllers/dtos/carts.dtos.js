import CartsMongoDAO from '../daos/cartsMongoDAO.js'
import errorFactory from '../factory/error.factory.js'
import { transporter } from '../helpers/mailer.js'
import mongoose from 'mongoose'

export class CartsDtos {
    constructor() {
        this.cartsMongo = new CartsMongoDAO()
    }

    async getCart(user) {
        let cart = await await this.cartsMongo.get()
        if (cart.length !== 0) {
            let user_cart = cart.map((cart) => {
                if (cart.user === user) {
                    return cart
                }
            })
            if (user_cart === undefined) {
                return ''
            } else {
                return cart
            }
        } else {
            return { mensaje: 'no hay productos actualmente', result: 'NO' }
        }
    }

    async createCart(products, user) {
        let new_cart = { productos: products, user: user }
        let created = await this.cartsMongo.create(new_cart)
        return { result: 'created', id_created: created._id }
    }

    async updateCart(old_cart, products) {
        let id = mongoose.mongo.ObjectId(old_cart._id)
        let old_products = old_cart.productos
        let updated_products = [...old_products , ...products]
        let update = await this.cartsMongo.update(id, updated_products)
        return update
    }

    async deleteCart(user) {
        let cart = await this.cartsMongo.get()
        if (cart.length !== 0) {
            let user_cart = cart.map((cart) => {
                if (cart.user === user) {
                    return cart
                }
            })
            if (user_cart === undefined) {
                return 'no se puedo borrar'
            } else {
                let deleted = await this.cartsMongo.delete(user_cart._id)
                return deleted
            }
        } else {
            return 'no hay carritos.'
        }
    }

    async order(data) {
        let date = new Date()
        let [month, day, year] = [
            date.getMonth(),
            date.getDate(),
            date.getFullYear(),
        ]
        date = `${day}/${month}/${year}`

        function productos() {
            let productos = ''
            data.products.map((producto) => {
                let productos = productos + `<p>${producto.name}</p>`
            })
            return productos
        }

        let info = await transporter
            .sendMail({
                from: '"Fede 👻" woodfederico@gmail.com', // sender address
                to: data.email, // list of receivers
                subject: 'Tu compra! ✔', // Subject line
                text: 'Hola, aqui tienes tu comprobante.', // plain text body
                html: `
            <div>
                <p> Hola${data.user}!</p>
                Tus productos comprados: ${productos}
                Fecha: ${date}
            </div>
            `,
            })
            .then((info) => {
                return { response: info.envelope }
            })
        return { response: info.envelope }
    }
}
