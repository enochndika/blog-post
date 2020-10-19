const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const contact = (req, res) => {
  const { email, name, message } = req.body;
  const msg = {
    to: email,
    from: "enochbeloved@gmail.com",
    subject: "Un client vous a envoyé un message",
    text: message,
    html: `
    <h3>Message de la part de <strong>${name}<strong/></h3>
    <p><strong>Email : </strong>${email}</p>
    <p>${message}</p>
    `,
  };
  sgMail
    .send(msg)
    .then(() => {
      res.json("Message envoyé");
    })
    .catch((error) => {
      console.error(error.message);
    });
};

export { contact };
