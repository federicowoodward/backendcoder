import ProductsMongoDAO from "../daos/productsMongoDAO.js";

export class ProductsDtos {
  constructor() {
    this.productsMongo = new ProductsMongoDAO();
  }

  async getProducts() {
    let products = await this.productsMongo.get();
    if (products.length !== 0) {
      return products;
    } else {
      return "no hay productos";
    //   return errorFactory.getError("no hay productos actualmente");
    }
  }
}
