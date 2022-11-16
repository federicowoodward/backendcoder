import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 15,
    },
})

export const usersModel = mongoose.model(`Usuarios`, userSchema);

