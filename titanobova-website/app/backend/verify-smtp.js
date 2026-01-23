require('dotenv').config();
const nodemailer = require('nodemailer');

(async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465', 10),
      secure: (process.env.SMTP_SECURE === 'true'),
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
    });

    console.log('Attempting transporter.verify()...');
    await transporter.verify();
    console.log('✓ SMTP transporter verified');

    // Optional quick test send (will not be used unless uncommented)
    // const info = await transporter.sendMail({
    //   from: process.env.SMTP_FROM || process.env.SMTP_USER,
    //   to: process.env.NOTIFY_EMAIL,
    //   subject: 'SMTP Verify Test',
    //   text: 'This is a test message from verify-smtp.js'
    // });
    // console.log('Test message sent:', info.messageId);

  } catch (err) {
    console.error('✗ SMTP verify failed:', err.code || err.responseCode || err.message || err);
    process.exitCode = 1;
  }
})();