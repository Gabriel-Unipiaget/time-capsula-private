const cron = require("node-cron");
const Capsula = require("../models/Capsula");
const enviarEmail = require("../services/emailService");

cron.schedule("* * * * *", async () => {
    const agora = new Date();

    const capsulas = await Capsula.find({
        dataAbertura: { $lte: agora },
        aberta: false
    });

    for (let c of capsulas) {
        await enviarEmail(c);
        c.aberta = true;
        await c.save();
    }
});



cron.schedule("* * * * *", async () => {
    console.log("Verificando cápsulas...");

    const agora = new Date();

    const capsulas = await Capsula.find({
        dataAbertura: { $lte: agora },
        aberta: false
    });

    console.log("Encontradas:", capsulas.length);

    for (let c of capsulas) {
        console.log("Enviando cápsula:", c.nome);

        await enviarEmail(c);

        c.aberta = true;
        await c.save();

        console.log("Capsula enviada com sucesso");
    }
});
