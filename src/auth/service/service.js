const  bcrypt = require('bcrypt')
const  jwt = require('jsonwebtoken')
const {pool} = require('../../../config/db');
const dbpool=pool.promise();





exports.registration_user = async function (data) {
    let pSalt = await bcrypt.genSalt(10);
    let hash  = await bcrypt.hash(data.password,pSalt);
    const { email} = data

    var d = new Date();
    d.setDate(d.getDate());
    var dd = String(d.getDate());
    var mm = String(d.getMonth() + 1); //January is 0!
    var yyyy = d.getFullYear();
    var today=yyyy+"/"+mm+"/"+dd;

    try {
                var sql1 = `select * from users where email = '${email}'`;
                const [data1,res] = await dbpool.query(sql1);
                if(data1.length==0){
                    console.log("data",data)
                    var sql =  `INSERT INTO users (full_name, email, password, account_created)
                            VALUES ('${data.full_name}', '${data.email}', '${hash}', '${today}'); `
                   
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
                      return  {message:"Account with this Email address is already Exist",data:{},status:0}
                }
               
            }
    }
 
    catch (err) {
        console.log(err)
        return err+"System Error";
    }
};



exports.Login_get =async function (datas) {


    const {email,password } = datas;

    let emaillowercase=email.toLowerCase();

    try {
        var sql1 = `select * from users where email = '${emaillowercase}' `;
        const [data] = await dbpool.query(sql1);  
   
       if(data.length==0 || data[0].account_status=='deleted')
       {
         return "Account Not Exist"
       } 
       else {
           const match = await bcrypt.compare(password, data[0].password);
            if(!match){ 
                    return {message:"Email or Password is Wrong",data:{user_id:""},status:0}
                }
            else{ 
               const accessToken = jwt.sign({id : data[0].id},"mycustomersecretkey",{ expiresIn: '58m' } ); 
               const user_id = data[0].user_id ;  
               const sql1 = `update users SET jwt_token ='${accessToken}' where user_id = '${user_id}' `;
                console.log(sql1)
               // console.log(sql1)
               const [fields] = await dbpool.query(sql1);  
               if(fields.affectedRows>=1){
               
               return {message:"Login Successfully",data:{
               "message" : "Login Successfully",
               "Token" : accessToken,
               "user_id" : data[0].id,
               "full_name" : data[0].full_name,
               "email" : data[0].email
               },status:1}
                }
                else
                {
                  return {message:"Not Login Successfully",data:{user_id:""},status:0}

                }
                }    
       }
   }
   catch (err) {
       return err+"System Error";
   
   }
   };
   
   exports.getBusinessData=async function (creator) {
    console.log(creator.data)
    let id=creator.data.user_id;
 
    const sql =  `SELECT * FROM user
    INNER JOIN creator on user.id=creator.user_id WHERE user.id=${id}`;

    try{
    const [data] = await dbpool.query(sql);
    creator.data.buiness_email=data[0].buiness_email
    creator.data.profile_image=data[0].profile_image
    creator.data.cover_image=data[0].cover_image
    creator.data.contact_number=data[0].contact_number
    creator.data.no_of_followers=data[0].no_of_followers

    return creator;
    }catch(e){
        console.log(e)
        return creator;
    }

   }

   
exports.getNotificationService=async function (data) {


const sql =  `SELECT * FROM user where id=${data.id}`;

try{
const [data] = await dbpool.query(sql);
if(data.length>=0)
return {message:"data fetched",data:{notification_status:data[0].notification_status},status:1}
else
return {message:"data not fetched",data:{},status:0}
}catch(e){
    console.log(e)
    return e;
}
}


exports.Logout_get = async function (data) {
   const {user_id,email} = data;
    const sql =  `update user SET jwt_token =null where id = '${user_id}' or  email='${email}'`;
    const [fields] = await dbpool.query(sql);
    try{
    if(fields.affectedRows>=1){
        return {message:"Logout Successfully",data:{user_id:""},status:1}

    }
    else {
         return {message:"Not Logout Successfully",data:{user_id:""},status:0}

         
    }
}catch(err)
{
    return "System Error" 
}
};

exports.deleteAccountService = async function (data) {
    const {user_id} = data;
     const sql =  `update user SET account_status ='deleted' where id = '${user_id}'`;
     const [fields] = await dbpool.query(sql);
     try{
     if(fields.affectedRows>=1){
         return {message:"Account Deleted",data:{user_id:""},status:1}
 
     }
     else {
          return {message:"Not Logout Successfully",data:{user_id:""},status:0}
 
          
     }
 }catch(err)
 {
     return "System Error" 
 }
 };
 



exports.notification_switch_service = async function (data) {
    const {user_id,notification_status} = data;
     const sql =  `update user SET notification_status ='${notification_status}' where id = '${user_id}'`;
     const [fields] = await dbpool.query(sql);
     try{
        console.log(sql)
     if(fields.affectedRows>=1){
         return {message:"updated Successfully",data:{user_id:""},status:1} 
     }
     else {
          return {message:"Not Updated Successfully",data:{user_id:""},status:0}
     }
 }catch(err)
 {
     return "System Error" 
 }
 };

 

 exports.updateColorAdmin_service = async function (data) {
    const {id,color_code,color_name,color_discription,color_in_use} = data;
     const sql =  `update color_tone SET color_code='${color_code}',color_name='${color_name}',color_discription='${color_discription}',color_in_use='${color_in_use}' where id = '${id}'`;
     console.log(sql)
     const [fields] = await dbpool.query(sql);
     try{
        
     if(fields.affectedRows>=1){
         return {message:"updated Successfully",data:{user_id:""},status:1} 
     }
     else {
          return {message:"Not Updated Successfully",data:{user_id:""},status:0}
     }
 }catch(err)
 {   console.log(err)
     return "System Error" 
 }
 };


 
 exports.addColorAdmin_service = async function (data) {
    const {id,color_code,color_name,color_discription,color_in_use} = data;
     const sql =  `insert into color_tone (color_code,color_name,color_discription,color_in_use) values('${color_code}','${color_name}','${color_discription}','${color_in_use}')`;
     console.log(sql)
     const [fields] = await dbpool.query(sql);
     try{
        console.log(fields);
     if(fields.affectedRows>=1){
         return {message:"color inserted Successfully",data:{user_id:""},status:1} 
     }
     else {
          return {message:"Not inserted Successfully",data:{user_id:""},status:0}
     }
 }catch(err)
 {   console.log(err)
     return "System Error" 
 }
 };




 exports.updateCreatorService = async function (data) {

    const {full_name,business_name,contact_number,address,profile_image,cover_image,creator_id} = data;
        let pi=``;
        let ci=``;

        if(profile_image!=null && profile_image!=undefined)
                pi=` profile_image='${profile_image}',`;
        if(cover_image!=null && cover_image!=undefined)
                ci=`cover_image='${cover_image}',`;
            
     try{
     const sql = `UPDATE user SET full_name='${full_name}',address='${address}' WHERE id='${creator_id}'`
     var [fields] = await dbpool.query(sql);

    
     if(fields.affectedRows>=1){                    
        const sql1 = `UPDATE creator SET ${pi} ${ci} business_name='${business_name}',contact_number='${contact_number}' WHERE user_id='${creator_id}'`
        console.log(sql1);
        var [fields] = await dbpool.query(sql1);
        console.log(fields)
        if(fields.affectedRows>=1){  
            return {message:" Updated Successfully",status:1}
        }
     }
     else {
          return {message:" Not Updated Successfully",status:1}
     }
 }catch(err)
 {
    console.log(err)
     return "System Error" 
 }
 };





exports.update_user = async function (data) {
    const {full_name,address,user_id} = data;
    const sql = `UPDATE user SET full_name='${full_name}',address='${address}' WHERE id=${user_id}`
    console.log(sql)
    var [fields] = await dbpool.query(sql);
     try{
     if(fields.affectedRows>=1)
     {
        return {message:" Updated Successfully",status:1}
     }
     else 
     {
        return {message:" Not Updated Successfully",status:1}
    }
 }catch(err)
 {
    console.log(err)
     return "System Error" 
 }
 };
 exports.updateAdminuser = async function (data) {
    const {full_name,address,user_id,account_status,notification} = data;
    const sql = `UPDATE user SET full_name='${full_name}',address='${address}',account_status='${account_status}',notification_status='${notification}' WHERE id=${user_id}`
    console.log(sql)
    var [fields] = await dbpool.query(sql);
     try{
     if(fields.affectedRows>=1)
     {
        return {message:" Updated Successfully",status:1}
     }
     else 
     {
        return {message:" Not Updated Successfully",status:0}
    }
 }catch(err)
 {
    console.log(err)
     return "System Error" 
 }
 };

 exports.updateAdminCreator = async function (data) {
    const {full_name,address,user_id,account_status,notification,business_name} = data;
    const sql = `UPDATE user SET full_name='${full_name}',address='${address}',account_status='${account_status}',notification_status='${notification}' WHERE id=${user_id}`
    var [fields] = await dbpool.query(sql);
     try{
     if(fields.affectedRows>=1)
     {
        const sql1 = `UPDATE creator SET business_name=${business_name}' WHERE user_id=${user_id}`
        var [field] = await dbpool.query(sql1);



        return {message:" Updated Successfully",status:1}
     }
     else 
     {
        return {message:" Not Updated Successfully",status:0}
    }
 }catch(err)
 {
    console.log(err)
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


exports.forgetPassword = async function (data) {
 
    const { email} = data
    try {

    let timestamps=Date.now();
    let temp=``;
    const sql =  `update users SET link_generation_time ='${timestamps}',reset_link='${temp}' where  email='${email}'`;
    
    const [fields] = await dbpool.query(sql);
    
    if(true){
        var sql1 = `select * from users where email = '${email}'`;
        const [data1,res] = await dbpool.query(sql1);
        console.log(data1,"*********")
        if(data1.length>0)
        return {message:"Password Reset Link Has been generated and sent to your registered account",data:{user_id:data1[0].user_id,email:email},status:1}
        else
        return {message:"your account doestnot exist",data:{user_id:"",email:""},status:0}
        
    }
    else {
        
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
        var d = new Date();
        d.setDate(d.getDate());
        var dd = String(d.getDate());
        var mm = String(d.getMonth() + 1); //January is 0!
        var yyyy = d.getFullYear();
        var today=yyyy+"/"+mm+"/"+dd;
        var sql = `insert into creator (buiness_email, profile_image, cover_image, user_id, contact_number,created_at)
            values ('${data.email}','${data.profile_image}','${data.cover_image}','${data.user_id}','${data.contact_number}','${today}') `;
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

exports.verifyPasswordLinkService = async function (data) {

try{
    var sql1 = `select * from users where user_id = '${data.user_id}'`;
                const [data1,res] = await dbpool.query(sql1);
                if(data1.length>0){

                    let timeDifference=Date.now()- data1[0].link_generation_time;
                    if(timeDifference>1800000){
                        return {message:"Link Expired",data:{validated:"0"},status:0}
                    }else{
                        return {message:"Please reset your password",data:{validated:"1"},status:1}
                    }

                }else{
                    return {message:"Link is not valid",data:{validated:"0"},status:0}
                }


}catch (e){
    return e+"System Error";

}


}

exports.resetPasswordService = async function (data) {
    const {user_id} = data;
        let pSalt = await bcrypt.genSalt(10);
    let hash  = await bcrypt.hash(data.password,pSalt);
    console.log(hash);

     const sql =  `update users SET password ='${hash}' where user_id = '${user_id}'`;

     const [fields] = await dbpool.query(sql);
     console.log(fields,sql)
     try{
     if(fields.affectedRows>=1){
        return {message:"password Updated Successfully",data:{},status:1}

     }
     else {
        return {message:"password updation failed",data:{},status:0}

     }
 }catch(err)
 {
     return "System Error" 
 }
 };

 exports.resetPassWordWithOldPassCodeService = async function (data_rec) {
    const {user_id,old_password} = data_rec;
        let pSalt = await bcrypt.genSalt(10);
        let hash  = await bcrypt.hash(data_rec.password,pSalt);

    try{
    var sql1 = `select * from user where id = '${user_id}'`;
    const [data] = await dbpool.query(sql1);  

   if(data.length==0)
   {
      
     return {message:"No User Found with id",data:{user_id:""},status:0}

   } 
   else {
    console.log()
       const match = await bcrypt.compare(old_password, data[0].password);
        if(!match){ 
         
            return {message:"Old password is not correct",data:{user_id:""},status:0}
        }

        const sql =  `update user SET password ='${hash}' where id = '${user_id}'`;

        const [fields] = await dbpool.query(sql);
        console.log(fields,sql)
     
        if(fields.affectedRows>=1){
            return {message:"password Updated Successfully",data:{},status:1}
        }
        else {
            return {message:"password Updated Successfully",data:{},status:0}
        }




}





 }catch(err)
 {
    console.log(err);
    return {message:"system err",data:{},status:0}
 }
 };


 

exports.get_user_listService = async function (data) {

    try{
        var sql1 = `select id as user_id,full_name as name from user where account_type='user'`;
                    const [data1,res] = await dbpool.query(sql1);
                    if(data1.length>0){
                        return {message:"user list",data:{list:data1},status:1}
                    }else{
                        return {message:"No data fetched",data:{list:""},status:0}
                    }
    
    
    }catch (e){
        return e+"System Error";
    
    }
    
    }


    

    exports.get_creator_listService = async function (data) {

        try{
            var sql1 = `select id as user_id,full_name as name from user where account_type='creator'`;
                        const [data1,res] = await dbpool.query(sql1);
                        if(data1.length>0){
                            return {message:"creator list",data:{list:data1},status:1}
                        }else{
                            return {message:"No data fetched",data:{list:""},status:0}
                        }
        
        
        }catch (e){
            return e+"System Error";
        
        }
        
        }
    