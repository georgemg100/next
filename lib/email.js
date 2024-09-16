//import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer');

console.log(process.env)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  //secure: process.env.EMAIL_SERVER_SECURE === 'true', // Use TLS
});

// Verify the connection configuration
transporter.verify(function(error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take our messages");
  }
});
/**
 * Sends an email using the provided parameters.
 * @param {string} recipient - The email address of the recipient.
 * @param {string} subject - The subject of the email.
 * @param {string} body - The body content of the email (can be HTML).
 * @param {Object} [options] - Additional options for email sending.
 * @returns {Promise<Object>} A promise that resolves with the info from the sent email.
 */
/*
export async function sendEmail(recipient, subject, body, options = {}) {
  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
    //secure: process.env.EMAIL_SERVER_SECURE === 'true', // Use TLS
  });

  // Set up email data
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: recipient,
    subject: subject,
    html: body,
    ...options, // Allow for additional options like attachments
  };

  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error; // Re-throw the error for the caller to handle
  }
}

/**
 * Sends a welcome email to a new user.
 * @param {string} email - The email address of the new user.
 * @param {string} name - The name of the new user.
 */
/*
export async function sendWelcomeEmail(email, name) {
  const subject = 'Welcome to Our Service!';
  const body = `
    <h1>Welcome, ${name}!</h1>
    <p>Thank you for joining our service. We're excited to have you on board!</p>
    <p>If you have any questions, please don't hesitate to contact our support team.</p>
  `;

  await sendEmail(email, subject, body);
}

/**
 * Sends a subscription confirmation email.
 * @param {string} email - The email address of the user.
 * @param {string} planName - The name of the subscribed plan.
 */
/*
export async function sendSubscriptionConfirmationEmail(email, planName) {
  const subject = 'Subscription Confirmed';
  const body = `
    <h1>Subscription Confirmed</h1>
    <p>Thank you for subscribing to our plan.</p>
    <p>Your subscription is now active. Enjoy all the benefits of your new plan!</p>
  `;

  await sendEmail(email, subject, body);
}

// Export other email template functions as needed...
export async function sendSubscriptionCanceledConfirmation(email, planName) {
  const subject = 'Subscription Confirmed';
  const body = `
    <h1>Subscription Canceled</h1>
    <p>Thank you for using our service.</p>
    <p>We hope to see you again</p>
  `;

  await sendEmail(email, subject, body);
}*/
