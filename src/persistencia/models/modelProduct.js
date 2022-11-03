import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
    nombre: {
        type: String,
        // required: true,
        maxLength: 50,
        unique: true
    },
    descripcion: {
        type: String,
        // required: true,
        // maxLength: 50,
        unique: true
    },
    precio: {
        type: Number,
        // required: true,
        default: 100
    },
    stock: {
        type: Number,
        // required: true,
    },
})

export const productsModel = mongoose.model(`Productos`, productsSchema);

