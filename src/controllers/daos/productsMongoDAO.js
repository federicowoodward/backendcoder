import { MongoClass } from "../contenedor/Mongoclass.js";
import { productsModel } from "../../persistencia/models/modelProduct.js";

class ProductsMongoDAO extends MongoClass { 
    constructor() {
        super(productsModel)
    }

 
}

export default ProductsMongoDAO;