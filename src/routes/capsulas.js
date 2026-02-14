const express = require("express");
const router = express.Router();
const multer = require("multer");
const Capsula = require("../models/Capsula");

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post("/", upload.single("imagem"), async (req, res) => {
    try {
        const { nome, texto, email, dataAbertura } = req.body;

        const novaCapsula = await Capsula.create({
            nome,
            texto,
            email,
            dataAbertura,
            imagem: req.file ? req.file.path : null
        });

        res.status(201).json(novaCapsula);
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar cápsula" });
    }
});

module.exports = router;