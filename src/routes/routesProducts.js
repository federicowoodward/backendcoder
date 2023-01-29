import { Router } from 'express';
import {
    getProducts,
    getProductById,
    createProduct,
    udapteProduct,
    deleteProduct,
    createTwilioClient
} from "../controllers/controllers/products.controllers.js";

const router = Router();

router.get("/", getProducts)
router.get("/:id", getProductById)
router.post("/", createProduct)
router.put("/:id", udapteProduct)
router.delete("/:id", deleteProduct)
router.post("/twilio", createTwilioClient)

export default router;