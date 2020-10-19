const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID);

export default async (req, res) => {
  const { email, name, message } = req.body;
  const msg = {
    to: "djhenockndi@live.fr",
    from: email,
    subject: "Un client vous a envoyé un message",
    text: message,
    html: `
    <h3>Message de la part de <strong>${name}<strong/></h3>
    <p><strong>Email : </strong>${email}</p>
    <p>${message}</p>
    `,
  };
  if (req.method === "POST") {
    await sgMail.send(msg);
    return res.status(200).end();
  }
  return res.status(404).json({
    error: {
      code: "not_found",
      message:
        "The requested endpoint was not found or doesn't support this method.",
    },
  });
};
