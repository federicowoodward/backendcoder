import { MongoClass } from "../contenedor/Mongoclass.js";
import {cartModel} from "../../persistencia/models/modelCart.js";

class CartsMongoDAO extends MongoClass { 
    constructor() {
        super(cartModel)
    }

}

export default CartsMongoDAO;