require("dotenv").config();
const app = require("./src/app");
const mongoose = require("mongoose");
const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Mongo conectado");

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });

    })
    .catch(err => console.error(err));