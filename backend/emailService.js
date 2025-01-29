import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});

export function sendWelcomeEmail(to, username, password) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Welcome to Our Platform',
    text: `Hello ${username},\n\n Your password is \n ${password}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
}