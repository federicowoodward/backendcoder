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
    // create product
    const product_test_create = () => {
        return {
            nombre: 'product test' + Date.now(),
            descripcion: 'test timestamp: ' + Date.now(),
            precio: 21,
            stock: 122,
        }
    }
    let id_create
    describe('CREATE', () => {
        const data = async () => {
            return await axios.post(
                'http://localhost:8080/products/',
                product_test_create()
            )
        }

        it('Mensaje correcto', (done) => {
            data()
                .then((res) => {
                    expect(res.data.message).to.equal(`created`)
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
                    id_create = res.data.id
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
        it('Creado correctamente', (done) => {
            const data = async () => {
                return await axios.get(
                    `http://localhost:8080/products/${id_create}`
                )
            }
            data()
                .then((res) => {
                    expect(res.data).to.be.a(`object`)
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
    })
    // udapte 
    // describe("UDAPTE", () => {
    //     const product_test_udapte = () => {
    //         return {
    //             nombre: 'udapte',
    //             descripcion: 'test udapte time: ' + Date.now(),
    //             precio: 2,
    //             stock: 2,
    //         }
    //     }
    //     const data = async () => {
    //         return await axios.put(
    //             `http://localhost:8080/products/${id_create}`,
    //             product_test_udapte()
    //         )
    //     }
    //     it('Status correcto', (done) => {
    //         data()
    //             .then((res) => {
    //                 expect(res.status).to.equal(200)
    //                 done()
    //             })
    //             .catch((err) => {
    //                 done(err)
    //             })
    //     })
    //     it('Actualizado correctamente', (done) => {
    //         const data = async () => {
    //             return await axios.get(
    //                 `http://localhost:8080/products/${id_create}`
    //             )
    //         }
    //         data()
    //             .then((res) => {
    //                 expect(res.data.nombre).to.equal("udapte")
    //                 expect(res.data.precio).to.equal(2)
    //                 expect(res.data.stock).to.equal(2)
    //                 done()
    //             })
    //             .catch((err) => {
    //                 done(err)
    //             })
    //     })
    // })
    // delete
    describe('DELETE', () => {
        const data = async () => {
            return await axios.delete(
                `http://localhost:8080/products/${id_create}`
            )
        }
        it('Mensaje correcto', (done) => {
            data()
                .then((res) => {
                    expect(res.data.message).to.equal(`deleted`)
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
        it('Status correcto', (done) => {
            data()
                .then((res) => {
                    expect(res.status).to.equal(200)
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
        it('Borrado correctamente', (done) => {
            const data = async () => {
                return await axios.get(
                    `http://localhost:8080/products/${id_create}`
                )
            }
            data()
                .then((res) => {
                    expect(res.data).to.equal(null)
                    done()
                })
                .catch((err) => {
                    done(err)
                })
        })
    })
})
