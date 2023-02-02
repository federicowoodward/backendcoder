import chai from "chai";
import assert from "assert";
import { 
    getProducts, 
    getProductById, 
    createProduct, 
    deleteProduct, 
    udapteProduct 
} from "../src/controllers/controllers/products.controllers.js";

const expect = chai.expect

describe(`Get products`, () => {
    const resultado = getProducts()
    
    it(`Objeto`, () => {
        assert.equal(typeof resultado, typeof [])
    })

    it(`Al menos un producto`, () => {
        expect.to.be.a(`Object`)
    })
})