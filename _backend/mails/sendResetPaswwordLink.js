const nodemailer = require("nodemailer");

const sendResetPasswordLink = async (contactData) => {
  const contactMail = `
    <h3 style="color: #333;">Bonjour, ${contactData?.lastName}</h3>
    <br/>
    <p>Suite à votre demande, vous pouvez changer votre mot de passe en cliquant sur le lien suivant :</p>
    <p>Vous avez 10 minutes pour effectuer le changement</p>
    <br/>
    <a href="${contactData.resetLink}">Modifier votre mot de passe</a>
    <br/>
    <p>Si vous n'ête pas à l'origine de cette demande, veuillez ignorer ce mail</p>
    <br/>
    <br/>
    <h3>L'équipe Shopping-Digital</h3>
  `;

  const emailAdmin = process.env.ADMIN_EMAIL;
  const mailSab = process.env.MAIL_ADMIN_CONTACT_FORM;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });

  async function main() {
    const info = await transporter.sendMail({
      from: '"Shopping-Digital 👻" <admin@Shopping-Digital.com>',
      to: contactData?.email,
      bcc: `${mailSab}, ${emailAdmin}`,
      subject: "Réinitialisation de mot de passe",
      html: contactMail,
    });
    return info;
  }

  return main();
};

module.exports = sendResetPasswordLink;
