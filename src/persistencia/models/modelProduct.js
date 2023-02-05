import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        maxLength: 50,
    },
    descripcion: {
        type: String,
        // maxLength: 50,
    },
    precio: {
        type: Number,
        required: true,
        default: 100
    },
    stock: {
        type: Number,
    },
})

export const productsModel = mongoose.model(`Productos`, productsSchema);

