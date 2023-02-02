import chai from "chai";
import {
   ProductsDtos
    // getProductById,
    // createProduct,
    // deleteProduct,
    // udapteProduct
} from "../src/controllers/dtos/products.dtos.js";
import axios from "axios"

const expect = chai.expect

const productsDtos = new ProductsDtos()


// 639e590c58f2e99bb1cdd98e
// expect(res.data).to.be.a(`object`)


describe(`Prueba del Dtos productos`, () => {
    it(`Recibir mismo id`,  (done) => {
        axios.get(`http://localhost:8080/products/639e590c58f2e99bb1cdd98e`).then( res => {
            expect(res.data._id).to.be.equal(`639e590c58f2e99bb1cdd98e`)
            done()
        })
        .catch(err => {
            done(err)
        })
    })
})