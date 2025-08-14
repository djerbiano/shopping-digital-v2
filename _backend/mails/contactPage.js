const nodemailer = require("nodemailer");

const sendMailContact = async (contactData) => {
  const contactMail = `
    <h2 style="text-align: center; color: #333;">Nous avons bien reçu votre message</h2>
    <br/>
    <p>De: ${contactData?.name} &lt;${contactData?.email}&gt;</p>
    <br/>
    <p><strong>Message:</strong></p>
    <p>${contactData?.message}</p>
    <br/>
    <p>Merci pour votre intérêt !</p>
    <h3>L'équipe Shopping-Digital</h3>
  `;

  const emailAdmin = process.env.ADMIN_EMAIL;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });

  async function main() {
    const info = await transporter.sendMail({
      from: '"Shoping-digital 👻" <admin@Shoping-digital.com>',
      to: `${contactData?.email}, ${emailAdmin}`,
      bcc: process.env.MAIL_ADMIN_CONTACT_FORM,
      subject: "Nouveau message de contact sur Shoping-digital",
      text: "Nouveau message de contact",
      html: contactMail,
    });
    return info;
  }

  return main();
};

module.exports = sendMailContact;
