const cron = require("node-cron");
const Capsula = require("../models/Capsula");
const enviarEmail = require("../services/emailService");

cron.schedule('* * * * *', async () => {
  console.log("Verificando cápsulas...");

  const agora = new Date();

  const capsulas = await Capsula.find({
    dataEnvio: { $lte: agora },
    enviada: false
  });

  console.log("Encontradas:", capsulas.length);

  for (const capsula of capsulas) {
    try {

      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: capsula.email,
        subject: 'Sua cápsula chegou!',
        html: `<p>${capsula.mensagem}</p>`
      });

      capsula.enviada = true;
      await capsula.save();

      console.log("Email enviado para:", capsula.email);

    } catch (err) {
      console.error("Erro ao enviar:", err.message);
    }
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
