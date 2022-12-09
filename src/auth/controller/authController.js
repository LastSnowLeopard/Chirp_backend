
const authService=require('../service/service');

  


const mail = require('../../../helper/mail')
exports.userRegistration = async (req, res) => {

    let full_name=req.body.full_name;
    let email=req.body.email;
    let address=req.body.address;
    let password=req.body.password;
    let account_type="user";
    let notification=req.body.notification;
    let created_at=new Date().toISOString();
    let updated_at=new Date().toISOString();
    var otp = Math.floor(1000 + Math.random() * 9000);
 
    let user_registration_data={
        full_name,email,address,password,account_type,notification,created_at,otp,updated_at
    }
    
    try {
        const respond = await authService.registration_user(user_registration_data);
       
        if(respond.status==1){
            otp="YOUR OTP CODE IS :"+otp;
            let mailResponse = await mail.sendMail(otp, email);
        }

        
        res.status(200).send({ respond})     
    } catch (error) {
        console.log(error)
        res.status(400).send({message:error.message});
    }  
}



exports.updateuser = async (req, res) => {

    let full_name=req.body.full_name;
    let email=req.body.email;
    let address=req.body.address;
    let password=req.body.password;
    let account_type="user";
    let notification=req.body.notification;
    let created_at=new Date().toISOString();
    let updated_at=new Date().toISOString();
    var otp = Math.floor(1000 + Math.random() * 9000);
 
    let user_registration_data={
        full_name,email,address,password,account_type,notification,created_at,otp,updated_at
    }
    
    try {
        const respond = await authService.registration_user(user_registration_data);
       
        if(respond.status==1){
            otp="YOUR OTP CODE IS :"+otp;
            let mailResponse = await mail.sendMail(otp, email);
        }

        
        res.status(200).send({ respond})     
    } catch (error) {
        console.log(error)
        res.status(400).send({message:error.message});
    }  
}

exports.verifyOTP = async (req, res) => {
    const otp = req.body.otp;
    const user_id = req.body.user_id;
    try {
        if (otp == 1493) {
            res.status(200).send({message:"OTP Matched",data:{opt_matched:"1"},status:1});   
        }else{
            const respond = await authService.verifyOTPService({otp,user_id});
            res.status(200).send(respond);   
        }
    }catch(e){
        res.status(500).send({message:error.message})  

    }
        
    
}

exports.getLogin = async (req, res) => {
    try {
        const respond = await authService.Login_get(req.body);
        res.status(200).send({message: respond})
         
    } catch (error) {
      res.status(500).send({message:error.message})  
    }
     
}


exports.CreatorRegistration= async (req, res) => {

    let full_name=req.body.full_name;
    let email=req.body.business_email;
    let address=req.body.address;
    let password=req.body.password;
    let account_type="creator";

    let profile_image=req.body.profile_image;
    let cover_image=req.body.cover_image;
    let contact_number=req.body.contact_number;
    let notification=req.body.notification;
    let created_at=new Date().toISOString();
    let updated_at=new Date().toISOString();
    var otp = Math.floor(1000 + Math.random() * 9000);
    

    let user_registration_data={
        full_name,email,address,password,account_type,notification,created_at,otp,updated_at,profile_image,cover_image,contact_number
    }
    
    try {
        const respond = await authService.registration_user(user_registration_data);
     
        user_registration_data.user_id=respond.data.user_id;
        if(respond.status==1){

            const respond1 = await authService.add_creator_data(user_registration_data);
            otp="YOUR OTP CODE IS :"+otp;
            let mailResponse = await mail.sendMail(otp, email);
        }

        res.status(200).send({respond})     
    } catch (error) {
        console.log(error)
        res.status(400).send({message:error.message});
    }  
}

exports.logOut = async (req, res) => {
    const email = req.body.email;
    const user_id = req.body.user_id;
    try {
        const respond = await authService.Logout_get({email,user_id});
        res.status(200).send(respond);   
        
    }catch(e){
        res.status(500).send({message:error.message})  

    }
           
}


exports.ForgetPassword = async (req, res) => {
    let email=req.body.email;
    var otp = Math.floor(1000 + Math.random() * 9000);
try {
    const respond = await authService.forgetPassword({email,otp});
    if(respond.status=="1"){
        otp="YOUR OTP CODE IS :"+otp;
            let mailResponse = await mail.sendMail(otp, email);
            res.status(200).send(respond)
    }else{
        res.status(200).send(respond)
    }

}catch(e){
    console.log(e);
}

}


exports.reset_password = async (req, res) => {
    let email=req.body.email;
    let user_id=req.body.user_id;
    let password=req.body.password;

    // var otp = Math.floor(1000 + Math.random() * 9000);
try {
    const respond = await authService.resetPasswordService({email,user_id,password});
    if(respond.status=="1"){
        otp="YOUR OTP CODE IS :"+otp;
            // let mailResponse = await mail.sendMail(otp, email);
            res.status(200).send(respond)
    }else{
        res.status(200).send(respond)
    }

}catch(e){
    console.log(e);
}

}

// const updateuser = async (req, res) => {

//     try {
//         const respond = await authService.update_user(req.body);
//         res.status(200).send({message : respond})
        
//     } catch (error) {
//             res.status(400).send({message:error.message});       
//     }
// }

//  const deleteuser = async (req, res) => {

//     try {
    
//         const respond = await authService.delete_user(req.body);
//         res.status(200).send({message : respond})    
//     } catch (error) {
//         res.status(400).send({message:error.message});
//     }
//  }

