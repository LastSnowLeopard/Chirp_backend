const  bcrypt = require('bcrypt')
const  jwt = require('jsonwebtoken')
const {pool} = require('../../../config/db');
const dbpool=pool.promise();
// let   pKey = "96udnagramu";



exports.Logout_get = async function (data) {
   const {user_id,email} = data;
    const sql =  `update user SET jwt_token =null where id = '${user_id}' or  email='${email}'`;
    const [fields] = await dbpool.query(sql);
    try{
    if(fields.affectedRows>=1){
        return "Logout Successfully"
    }
    else {
         return "Not Logout Successfully"
    }
}catch(err)
{
    return "System Error" 
}
};

exports.update_user = async function (data) {
    const {user_id,password,email,phone_no} = data;
     const sql =  `update users SET password = '${password}' ,email = '${email}' , phone_no = '${phone_no}' where user_id = '${user_id}' `;
     const [fields] = await dbpool.query(sql);
     try{
     if(fields.affectedRows>=1)
     {
         return "Update Successfully"
     }
     else 
     {
          return "Not Update Successfully"
     }
 }catch(err)
 {
     return "System Error" 
 }
 };

 exports.delete_user = async function (data) {
    const {id} = data;
     const sql =  `Delete from users where user_id = '${id}' `;
     const [fields] = await dbpool.query(sql);
     try{
     if(fields.affectedRows>=1)
     {
         return "User Deleted  Successfully"
     }
     else 
     {
          return "User Not Delete Successfully"
     }
 }catch(err)
 {
     return "System Error" 
 }
 };

exports.registration_user = async function (data) {
    let pSalt = await bcrypt.genSalt(10);
    let hash  = await bcrypt.hash(data.password,pSalt);
    const { email} = data
    try {
                var sql1 = `select * from user where email = '${email}'`;
                const [data1,res] = await dbpool.query(sql1);
                if(data1.length==0){
                    console.log("data",data)
                    var sql = `insert into user (full_name, email, address, password, account_type, notification_status,otp, created_at,updated_at)
                     values ('${data.full_name}','${data.email}','${data.address}','${hash}','${data.account_type}','${data.notification}','${data.otp}','${data.created_at}','${data.updated_at}') `;
                    const [fields] = await dbpool.query(sql)
                    console.log(fields.insertId);
                    if (fields.affectedRows >= 1) {
                        return {message:"User Registered Successfully",data:{user_id:fields.insertId},status:1}
                            }
                     else
                    {
                        return  {message:"Error in data",data:{},status:0 }
                    }       
            }
            else
            {
                if(data1[0].email==email){
                      return  {message:"Your email  already exist",data:{},status:0}
                }
               
            }
    }
 
    catch (err) {
        console.log(err)
        return err+"System Error";
    }
};

exports.forgetPassword = async function (data) {
 
    const { email} = data
    try {
    const sql =  `update user SET otp =${data.otp} where  email='${email}'`;
    const [fields] = await dbpool.query(sql);
    
    if(fields.affectedRows>=1){
        var sql1 = `select * from user where email = '${email}'`;
        const [data1,res] = await dbpool.query(sql1);

        return {message:"OTP send to reset password",data:{user_id:data1[0].id,email:email},status:1}
    }
    else {
         return {message:"your account doestnot exist",data:{user_id:"",email:""},status:0}
    }
            
    }
    catch (err) {
        console.log(err)
        return err+"System Error";
    }
};

exports.add_creator_data = async function (data) {
  
    const { email} = data
    try {
        
        var sql = `insert into creator (buiness_email, profile_image, cover_image, user_id, contact_number, created_at, updated_at)
            values ('${data.email}','${data.profile_image}','${data.cover_image}','${data.user_id}','${data.contact_number}','${data.created_at}','${data.updated_at}') `;
        const [fields] = await dbpool.query(sql)
        console.log(fields.insertId);
        if (fields.affectedRows >= 1) {
            return {message:"Creator Registered Successfully",data:{user_id:fields.insertId},status:1}
                }
            else
        {
            return  {message:"Error in data",data:{},status:0 }
        }       
                
          
    }
 
    catch (err) {
        console.error(err)
        return err+"System Error";
    }
};

exports.verifyOTPService = async function (data) {

try{
    var sql1 = `select * from user where id = '${data.user_id}' AND otp='${data.otp}'`;
                const [data1,res] = await dbpool.query(sql1);
                if(data1.length>0){
                    return {message:"OTP Matched",data:{opt_matched:"1"},status:1}
                }else{
                    return {message:"OTP doesnot Matched",data:{opt_matched:"0"},status:0}
                }


}catch (e){
    return e+"System Error";

}


}

exports.resetPasswordService = async function (data) {
    const {user_id,email} = data;
        let pSalt = await bcrypt.genSalt(10);
    let hash  = await bcrypt.hash(data.password,pSalt);

     const sql =  `update user SET password ='${hash}' where id = '${user_id}' or  email='${email}'`;
     const [fields] = await dbpool.query(sql);
     try{
     if(fields.affectedRows>=1){
         return "password Updated Successfully";
     }
     else {
          return "Password not updated"
     }
 }catch(err)
 {
     return "System Error" 
 }
 };