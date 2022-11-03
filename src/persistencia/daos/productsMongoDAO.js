import { MongoClass } from "../contenedor/Mongoclass.js";
import {productsModel} from "../models/modelProduct.js";

class ProductsMongoDAO extends MongoClass { 
    constructor() {
        super(productsModel)
    }

    async create(product) {
        return await productsModel.create(product);
        
    }
}

export default ProductsMongoDAO;