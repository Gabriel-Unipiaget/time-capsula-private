const transporter = require("../config/mailer");

async function enviarEmail(capsula) {
    await transporter.sendMail({
        from: process.env.EMAIL,
        to: capsula.email,
        subject: `Sua cápsula "${capsula.nome}" foi aberta!`,
        html: `
            <h1>${capsula.nome}</h1>
            <p>${capsula.texto}</p>
            ${capsula.imagem ? `<img src="cid:imagemCapsula"/>` : ""}
        `,
        attachments: capsula.imagem ? [{
            filename: "imagem.jpg",
            path: capsula.imagem,
            cid: "imagemCapsula"
        }] : []
    });
    
}

module.exports = enviarEmail;
