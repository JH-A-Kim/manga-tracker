const nodemailer = require('nodemailer');

async function sendEmail(to, subject, text) {
    let transporter = nodemailer.createTransport({
        service: 'outlook',
        auth: {
            user: 'sfuconnect@outlook.com',
            pass: '',
        },
    });

    let info = await transporter.sendMail({
        from: 'sfuconnect@outlook.com',
        to: to,
        subject: subject,
        text: text,
    });

    console.log('Message sent: %s', info.messageId);
}

sendEmail("kimisawesome72@yahoo.com", "hello", "hello").catch(console.error);

module.exports = { sendEmail };

//Remember to not commit your email password to a public repository
