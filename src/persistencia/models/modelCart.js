import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    productos: {
        type: Object,
        required: true,
    },
    user: {
        type: String,
        required: true,
        maxLength: 20,
        unique: true
    },
})

export const cartModel = mongoose.model(`Carritos`, cartSchema)
