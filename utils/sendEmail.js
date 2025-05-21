const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
service: 'gmail', // or use host/port if you use a different provider
auth: {
user: process.env.EMAIL_USER,
pass: process.env.EMAIL_PASS
}
});

async function sendEmail(to, subject, message) {
await transporter.sendMail({
// from: "Ministry Web App" <${user}>,
to,
subject,
text: message
});
};

module.exports = sendEmail;