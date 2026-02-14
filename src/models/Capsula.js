const mongoose = require("mongoose");

const CapsulaSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    texto: { type: String, required: true },
    imagem: { type: String },
    email: { type: String, required: true },
    dataAbertura: { type: Date, required: true },
    aberta: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Capsula", CapsulaSchema);