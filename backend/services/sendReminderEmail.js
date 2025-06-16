const emailjs = require('@emailjs/nodejs');
require('dotenv').config();

const sendReminderEmail = async (email, name) => {
  try {
    const res = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      process.env.EMAILJS_TEMPLATE_ID,
      {
        to_email: email,
        to_name: name,
        message: `Hey ${name}, \nLooks like you have not solved any problem for 7 days. \nLet's get back and solve some problems.`
      },
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );

    console.log(`✅ Email sent to ${email}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to send email to ${email}:`, error.response?.data || error.message);
    return false;
  }
};

module.exports = sendReminderEmail;
