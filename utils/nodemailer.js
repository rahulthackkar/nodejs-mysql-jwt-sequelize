const nodemailer = require("nodemailer");
const config = require("../config/auth.config");
const ejs = require("ejs");

const transport = nodemailer.createTransport({
  host: config.smtp.SMTP_HOST,
  port: config.smtp.SMTP_PORT,
  secure: false,
  auth: {
    user: config.smtp.SMTP_USER,
    pass: config.smtp.SMTP_PASSWORD,
  },
});
module.exports.sendWelcomeEmail = (user) => {
  ejs
    .renderFile(__dirname + "/../views/emails/welcome.ejs", {
      user: user,
    })
    .then((template) => {
      transport
        .sendMail({
          from: config.smtp.SMTP_USER,
          to: user.email,
          subject: `Hello ${user.name}! Welcome to Nodejs UpskillFest`,
          html: template,
        })
        .catch((err) => console.log(err));
    });
};
