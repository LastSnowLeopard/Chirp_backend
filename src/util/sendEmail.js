const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
    
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'asadiqbal1153@gmail.com',
            pass: '12345678Maij791@'
        }
    });
    console.log('created');
    transporter.sendMail({
        from: 'Dukan',
        to: email,
        subject: subject,
        text: text
    }).then(sent=>{
        console.log("sent",sent)
    }).catch(error=>{
        console.log("error",error)
    })
};

module.exports = sendEmail;