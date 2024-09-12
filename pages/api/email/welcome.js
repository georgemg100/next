import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { email, name } = req.body;

      // Create a nodemailer transporter
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      });

      // Email content
      const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Welcome to Our App!',
        text: `Hello ${name}, welcome to our app!`,
        html: `<p>Hello ${name}, welcome to our app!</p>`,
      };

      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.response);
      res.status(200).json({ message: 'Welcome email sent successfully' });
    } catch (error) {
      console.error('Error sending welcome email:', error);
      res.status(500).json({ error: 'Error sending welcome email', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
