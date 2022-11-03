import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    productos: {
        type: Object,
        required: false,
    },
    user: {
        type: String,
        required: true,
        maxLength: 50,
        }
})

export const cartModel = mongoose.model(`Carrito`, cartSchema);