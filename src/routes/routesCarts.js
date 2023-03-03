import { Router } from 'express';
import {
    getCart,
    createCart,
    updateCart,
    deleteCart,
    order
} from '../controllers/controllers/carts.controllers.js'

const router = Router();

router.post(`/`, getCart)

router.post(`/create`, createCart)

router.put(`/`, updateCart)

router.delete(`/`, deleteCart)

router.post(`/order`, order)

export default router;
