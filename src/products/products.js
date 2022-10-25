const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 50,
        unique: true
    },
    price: {
        type: Number,
        required: true,
        default: 100
    },
    stock: {
        type: Number,
        required: true,
    },
})
const productsModel = mongoose.model(`Productos`, productsSchema);

module.exports = productsModel