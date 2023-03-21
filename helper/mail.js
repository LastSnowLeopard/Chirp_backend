// "use strict";

var nodemailer = require('nodemailer');

 


module.exports.sendMail= async function sendMail(msg,email) {
  senMailPromise = () =>{
     return new Promise((resolve, reject)=>{
        

        let data=`${msg}`
        let emailAdress=`${email}`
      
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'MJonestattoos@gmail.com',
      pass: 'guzhip-Jembyd-7Tazva'
    }
  });

  var mailOptions = {
    from: 'MJonestattoos@gmail.com',
    to: [emailAdress],

    subject: 'Taatoo App OTP',
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


 
 
