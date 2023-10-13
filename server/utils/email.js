const nodemailer = require("nodemailer");
const pug = require("pug");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.url = url;
    this.name = user.name;

    this.transporter = nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(
      `${__dirname}/../dev-data/templates/${template}.pug`,
      {
        url: this.url,
        name: this.name,
      }
    );

    return await this.transporter.sendMail({
      to: this.to,
      from: `Contacto <${process.env.SENDGRID_EMAIL_SENDER}>`,
      subject,
      html,
    });
  }

  async sendResetPasswordLink() {
    return await this.send(
      "resetPassword",
      "Reset Your Password ! (this link is only alive for 10 minutes)"
    );
  }

  async sendVerifyEmailLink() {
    return await this.send(
      "verifyEmail",
      "Verify Your Email ! (this link is only alive for 24 hours)"
    );
  }
};
