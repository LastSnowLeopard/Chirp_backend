// "use strict";

var nodemailer = require('nodemailer');

 


module.exports.sendMail= async function sendMail(msg,email) {
  senMailPromise = () =>{
     return new Promise((resolve, reject)=>{
        

        let data=`${msg}`
        let emailAdress=`${email}`
      
  var transporter = nodemailer.createTransport({
    host: 'smtp.privateemail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'noreply@chirp.one',
      pass: 'chirpsocial28'  
    }
  });

  var mailOptions = {
    from: 'noreply@chirp.one',
    to: [emailAdress],

    subject: 'Reset your Password',
    text: data
  };

 let resp=false;
 
 transporter.sendMail(mailOptions, function(error, info){
     if (error) {
         console.log("error is "+error);
        resolve(false); // or use rejcet(false) but then you will have to handle errors
     } 
    else {
        console.log('Email sent: ' + info.response);
        resolve(true);
     }
    });
      });
  };

  try{
     let data= await senMailPromise();
     return data;
  }catch(e){
      console.log(e)
      return -1;
  }
}


 
 
