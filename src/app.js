const express = require("express");
const path = require("path");
require("./cron/verificador");

const capsulasRoutes = require("./routes/capsulas");

const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/teste", (req, res) => {
    res.send("API funcionando");
});

app.use("/capsulas", capsulasRoutes);

module.exports = app;