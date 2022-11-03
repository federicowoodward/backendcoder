import { faker } from "@faker-js/faker/locale/es";

export function mockProducts() {
    const product = {
        nombre: faker.commerce.productName(),
        descripcion: faker.commerce.productDescription(),
        precio: faker.commerce.price(),
        stock: faker.commerce.price(1, 40, 0)
    }

    return product
}