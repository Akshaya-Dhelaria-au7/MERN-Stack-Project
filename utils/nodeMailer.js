const nodemailer = require('nodemailer')
var array = []

const sendEmail = async options => {
    let transport = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.email,
            pass:process.env.password
        }
    })

    let mail_options = {
        from:'"Coding Hunt Team" <codinghunt9@gmail.com>',
        to: options.email,
        subject:'Welcome to Coding Hunt',
        html: 
        `<div>
            <h3><strong>Welcome to Coding Hunt<strong></h3>
            <br>
            <p>Please use the below OTP to sign in to Coding Hunt</p>
            <p><strong>${options.message}</strong></p>
            <br>
            <p>Regards,</p>
            <p>Team Coding Hunt</p>
        </div>
        `
    }

    await transport.sendMail(mail_options)
    console.log("Mail sent to :" , options.email)
}

module.exports = sendEmail;
