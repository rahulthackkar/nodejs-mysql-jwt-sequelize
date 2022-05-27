module.exports = {
  secret: "upskill-node",
  smtp: {
    SMTP_HOST: process.env.SMTP_HOST || "yoursmtphost.com",
    SMTP_PORT: process.env.SMTP_PORT || "yoursmtpport",
    SMTP_USER: process.env.SMTP_USER || "yoursmtpusername",
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || "yoursmtppassword",
  },
};
