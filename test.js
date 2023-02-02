import axios from 'axios'

const product_test_create = () => {
    return { nombre: 'product test', descripcion: 'test timestamp: ' + Date.now(), precio: 21, stock: 122,}}

    const data = async () => {
    return await axios.post('http://localhost:8080/products/', product_test_create())
}

console.log(data())
