const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // app password
  },
});

const Email = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"Vehicle Booking" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
};

module.exports = Email;