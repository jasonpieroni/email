const express = require('express')
const bodyParser = require('body-parser')
const nodemailer= require('nodemailer')
const { env } = require('process')
const app = express()

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/api/form', (req, res) => {
    nodemailer.createTestAccount((error, account) => {
        const htmlEmail =`
        <h3>Contact Details</h3>
        <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
        </ul>
        <h3>Message</h3>
        <p>${req.body.message}</p>
        `
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'lemuel.cartwright@ethereal.email',
            pass: '6fZxG3ZRGT3W4HhH49'
        }
    })
    let mailOptions = {
        from: 'test@testaccount.com',
        to: 'lemuel.cartwright@ethereal.email',
        replyTo: 'test@testaccount.com',
        subject: 'New Message',
        text: req.body.message,
        html: htmlEmail
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Message URL: %s', nodemailer.getTestMessageUrl(info));
    })
    })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})