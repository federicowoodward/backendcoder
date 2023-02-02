import chai from 'chai'
import axios from 'axios'

const expect = chai.expect

describe(`Rutas Productos`, () => {
    // getall
    describe('GET ALL', () => {
        const data = async () => {
            return axios.get(`http://localhost:8080/products`)
        }
        it('Array', (done) => {
            data()
                .then((res) => {
                    expect(res.data).to.be.a(`array`)
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
        it('No estar vacio', (done) => {
            data()
                .then((res) => {
                    expect(res.data).to.have.lengthOf.at.least(1)
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
        it(`Productos con keys correspondientes`, (done) => {
            data()
                .then((res) => {
                    let data = res.data
                    data.forEach((product) => {
                        expect(product).to.have.all.keys(
                            '_id',
                            'nombre',
                            'descripcion',
                            'precio',
                            'stock',
                            '__v'
                        )
                    })
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
        it(`Status correcto`, (done) => {
            data()
                .then((res) => {
                    expect(res.status).to.equal(200)
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
    })
    // getbyid
    describe(`GET BY ID`, () => {
        const data = async () => {
            return await axios.get(
                `http://localhost:8080/products/639e590c58f2e99bb1cdd98e`
            )
        }
        it('Id correspondiente', (done) => {
            data()
                .then((res) => {
                    expect(res.data._id).to.be.equal(`639e590c58f2e99bb1cdd98e`)
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
        it(`Objeto`, (done) => {
            data()
                .then((res) => {
                    expect(res.data).to.be.a(`object`)
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
        it(`Status correcto`, (done) => {
            data()
                .then((res) => {
                    expect(res.status).to.equal(200)
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
    })
    // create product
    const product_test_create = () => {
        return {
            nombre: 'product test',
            descripcion: 'test timestamp: ' + Date.now(),
            precio: 21,
            stock: 122,
        }
    }
    describe('CREATE', () => {
        const data = async () => {
            return await axios.post(
                'http://localhost:8080/products/',
                product_test_create()
            )
        }
        it(`Status correcto`, (done) => {
            data()
                .then((res) => {
                    expect(res.status).to.equal(200)
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
    })
})
