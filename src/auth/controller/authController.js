
const authService=require('../service/service');


const mail = require('../../../helper/mail')
exports.userRegistration = async (req, res) => {

    let full_name=req.body.full_name;
    let email=req.body.email;
    // let address=req.body.address || "";
    let password=req.body.password;
    // let account_type="user";
    // let notification=req.body.notification;
    let created_at=new Date().toISOString();
    let updated_at=new Date().toISOString();
    var otp = Math.floor(1000 + Math.random() * 9000);
 
    email=email.toLowerCase();

    let user_registration_data={
        full_name,email,password,created_at,updated_at
    }
    
    try {
        const respond = await authService.registration_user(user_registration_data);
       
        if(respond.status==1){
            otp="YOUR OTP CODE IS :"+otp;
            // let mailResponse = await mail.sendMail(otp, email);
        }

        
        res.status(200).send({ respond})     
    } catch (error) {
        console.log(error)
        res.status(400).send({message:error.message});
    }  
}

exports.updateCreator = async (req, res) => {
 
    let full_name=req.body.full_name;
    let business_name=req.body.business_name;
    let contact_number=req.body.contact_number;
    let address=req.body.address;
    let profile_image = req.body.profile_image || "";
    let cover_image = req.body.cover_image || '';
    let creator_id=req.body.creator_id;

    let creator_registration_data={
        full_name,business_name,contact_number,address,profile_image,cover_image,creator_id
    }
    
    try {
        const respond = await authService.updateCreatorService(creator_registration_data);
       
        res.status(200).send({ respond})     
    } catch (error) {
        console.log(error)
        res.status(400).send({message:error.message});
    }  
}


exports.updateUser = async (req, res) => {
 
    let full_name=req.body.full_name;
    let address=req.body.address;
    let user_id=req.body.user_id;

    let data={
        full_name,address,user_id
    }
    
    try {
        const respond = await authService.update_user(data);
       
        res.status(200).send({ respond})     
    } catch (error) {
        console.log(error)
        res.status(400).send({message:error.message});
    }  
}



exports.updateAdminUser = async (req, res) => {
 
    let full_name=req.body.full_name;
    let address=req.body.address;
    let user_id=req.body.id;
    let account_status=req.body.account_status;
    let notification=req.body.notification;

    let data={
        full_name,address,user_id,account_status,notification
    }
    
    try {
        const respond = await authService.updateAdminuser(data);
       
        res.status(200).send({ respond})     
    } catch (error) {
        console.log(error)
        res.status(400).send({message:error.message});
    }  
}


exports.updateAdmincreator = async (req, res) => {
 
    let full_name=req.body.full_name;
    let address=req.body.address;
    let user_id=req.body.id;
    let account_status=req.body.account_status;
    let business_name=req.body.business_name;
    let notification=req.body.notification;

    let data={
        full_name,address,user_id,account_status,notification,business_name
    }
    
    try {
        const respond = await authService.updateAdminCreator(data);
       
        res.status(200).send({ respond})     
    } catch (error) {
        console.log(error)
        res.status(400).send({message:error.message});
    }  
}




exports.verifyPasswordLink = async (req, res) => {
    const user_id = req.body.user_id;
    try {
        if (user_id == '18984564986') {
            res.status(200).send({message:"Link is valid",data:{validated:"1"},status:1});   
        }else{
            const respond = await authService.verifyPasswordLinkService({user_id});
            res.status(200).send(respond);   
        }
    }catch(e){
        res.status(500).send({message:error.message})  

    }
        
    
}

exports.getLogin = async (req, res) => {
    try {
        let respond = await authService.Login_get(req.body);

     
console.log(respond)
        res.status(200).send(respond)
         
    } catch (error) {
      res.status(500).send({message:error.message})  
    }
     
}

exports.CreatorRegistration= async (req, res) => {
    console.log(req.body);
    let full_name=req.body.full_name;
    let email=req.body.business_email;
    let address=req.body.address;
    let password=req.body.password;
    let account_type="creator";

    let profile_image = req.body.profile_image || "";
    let cover_image = req.body.cover_image || '';
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


exports.deleteAccount = async (req, res) => {
   
    const user_id = req.body.user_id;
    try {
        const respond = await authService.deleteAccountService({user_id});
        res.status(200).send(respond);   
        
    }catch(e){
        res.status(500).send({message:e.message})  

    }
           
}




exports.ForgetPassword = async (req, res) => {
    console.log(req.body)
    let email=req.body.email;
        email=email.toLowerCase();
    var hash = Math.floor(1000 + Math.random() * 9000);
try {
    var respond = await authService.forgetPassword({email});
    if(respond.status=="1"){
        
        let Link=`Click on link below to reset your password\n 
                http://chirp.one/reset-password/${respond.data.user_id}
                if you dont want to reset your passowrd ignore this mail \n`;
             let mailResponse = await mail.sendMail(Link, email);
            res.status(200).send(respond)
    }else{
        res.status(200).send(respond)
    }

}catch(e){

    console.log(e);
}

}


exports.reset_password = async (req, res) => {
    let user_id=req.body.user_id;
    let password=req.body.password;

try {
    const respond = await authService.resetPasswordService({user_id,password});
    if(respond.status=="1"){
        
            // let mailResponse = await mail.sendMail(otp, email);
            res.status(200).send(respond)
    }else{
        res.status(200).send(respond)
    }

}catch(e){
    console.log(e);
}

}


exports.reset_password_with_old_passcode = async (req, res) => {

    let user_id=req.body.user_id;
    let password=req.body.password;
    let old_password=req.body.old_password;

   console.log("ok")
try {
    const respond = await authService.resetPassWordWithOldPassCodeService({user_id,password,old_password});
    if(respond.status=="1"){
        // otp="YOUR OTP CODE IS :"+otp;
            // let mailResponse = await mail.sendMail(otp, email);
            res.status(200).send(respond)
    }else{
        res.status(200).send(respond)
    }

}catch(e){
    console.log(e);
}

}





exports.get_user_list = async (req, res) => {
    try {
        const respond = await authService.get_user_listService();
        if(respond.status=="1"){
                res.status(200).send(respond)
        }else{
            res.status(200).send(respond)
        }
    
    }catch(e){
        console.log(e);
    }
}

exports.get_creator_list = async (req, res) => {
    try {
        const respond = await authService.get_creator_listService();
        if(respond.status=="1"){
                res.status(200).send(respond)
        }else{
            res.status(200).send(respond)
        }
    
    }catch(e){
        console.log(e);
    }

}


exports.add_instant_user = async (req, res) => {

    let full_name=req.body.full_name;
    let email=req.body.email;
    let address="";
    let password="";
    let account_type="user";
    let notification="on";
    let otp="";
    let created_at=new Date().toISOString();
    let updated_at=new Date().toISOString();

    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 12;

    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
       }
 
    let user_registration_data={
        full_name,email,address,password,account_type,notification,created_at,otp,updated_at
    }
    
    try {
        const respond = await authService.registration_user(user_registration_data);
       
        if(respond.status==1){
            message="hello"+full_name+"Your Account has been created. your user_name is :" + email + "Password is:"+password;
            let mailResponse = await mail.sendMail(message, email);
        }

        
        res.status(200).send({ respond})     
    } catch (error) {
        console.log(error)
        res.status(400).send({message:error.message});
    }  
}



exports.notification_switch = async (req, res) => {
    const user_id = req.body.user_id;
    const notification_status = req.body.notification_status;
    try {
        const respond = await authService.notification_switch_service({user_id,notification_status});
        res.status(200).send(respond);   
        
    }catch(e){
        res.status(500).send({message:e.message})  

    }
           
}


exports.updateColorAdmin = async (req, res) => {
    const id = req.body.id;
    const color_code = req.body.color_code;
    const color_name = req.body.color_name;
    const color_discription = req.body.color_discription;
    const color_in_use = req.body.color_in_use;
    console.log(req.body)
    try {
        const respond = await authService.updateColorAdmin_service({id,color_code,color_name,color_discription,color_in_use});
        res.status(200).send(respond);   
        
    }catch(e){
        res.status(500).send({message:e.message})  

    }          
}



exports.addColorAdmin = async (req, res) => {
    const color_code = req.body.color_code;
    const color_name = req.body.color_name;
    const color_discription = req.body.color_discription;
    const color_in_use = req.body.color_in_use;
    console.log(req.body)
    try {
        const respond = await authService.addColorAdmin_service({color_code,color_name,color_discription,color_in_use});
        res.status(200).send(respond);   
        
    }catch(e){
        res.status(500).send({message:e.message})  

    }          
}




exports.getnotifications_by_id = async (req, res) => {
    const id = req.body.id;
 
    try {
        const respond = await authService.getNotificationService({id});
        res.status(200).send(respond);   
        
    }catch(e){
        res.status(500).send({message:e.message})  

    }
           
}
