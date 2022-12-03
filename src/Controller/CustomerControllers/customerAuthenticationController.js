// const Customer = require('../../models/customer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendEmail = require('../../util/sendEmail')
const moment = require('moment');

const {customerRegistration,searchCustomer,getUserProfile,updateCustomertoken,customerLogout,updateOtp}=require('../../service/customer');

// const login = async (req, res, next) => {
//     const { contact_no, user_password } = req.body;
//     console.log(req.body);
//     if (contact_no && user_password) {
//         const customer = await searchCustomer( contact_no )
//         if (customer.rows.length==0) {
//             res.status(201).send({data:{},message:"customer does not exist",status:false})
//         } else {
//             const isPasswordMatch = await bcrypt.compare(user_password, customer.rows[0].user_password)
//             if (!isPasswordMatch) {
//                 res.status(201).send({data:{},message:"Incorrect Password",status:false})
//             } else if (
//                 customer.rows[0].disabled=='true'
//             ) {
//                 res.status(200).send({data:{},status:false,message:"you can not login because your account is disabled contact to admin"})
//             } else {
//                 const jwt_token = jwt.sign({ id: customer.rows[0].id,email_address:customer.rows[0].email_address}, "mycustomersecretkey")
//                 let login={
//                     jwt_token:jwt_token,
//                     id:customer.rows[0].id
//                 }
//                 await updateCustomertoken(login);
//                 res.status(200).send({data:{ id:customer.rows[0].id,token:jwt_token,email_address:customer.rows[0].email_address },status:true,message:"Login Sucessfull"})
//             }
//         }
//     } else {
//         res.status(200).send({data:{},status:false,message:"fields are required"})
//     }
// }





const login = async (req, res, next) => {

try{
    
            if(req.body.login_type=='1'){ //manual
                    if(req.body.contact_no && req.body.login_type){
                         const customer = await searchCustomer( req.body.contact_no );
                            if (customer.rows.length==0) {
                                let user_location;
                                if(req.body.long && req.body.lat)
                                        user_location= `SRID=4326;POINT(${req.body.long} ${req.body.lat})`;
                                else
                                        user_location= `SRID=4326;POINT(0.00 0.00)`;
                                        let created_at = moment(new Date());
                                        created_at= moment.utc(created_at).format('l LT')
                                        let updated_at=created_at;
                                        let datas={
                                            first_name:req.body.first_name || " ",
                                            last_name:req.body.last_name || " ",
                                            email_address:req.body.email_address || " ",
                                            user_type:"customer",
                                            profile_picture:req.body.profile_picture || "",
                                            contact_no:req.body.contact_no || "",
                                            soft_deleted:req.body.soft_deleted ,
                                            otp:req.body.otp || "",
                                            updated_at:updated_at ,
                                            created_at:created_at,
                                            device_type:req.body.device_type || "",
                                            user_location:user_location || `SRID=4326;POINT(0.00 0.00)`,
                                            id_card_number:req.body.id_card_number || "",
                                            user_password: "",
                                            fcm_token:req.body.fcm_token || " ",
                                            login_type:req.body.login_type || " ",
                                            app_version:req.body.app_version || " ",
                                            device_name:req.body.device_name || " ",
                                            device_os:req.body.device_os || " ",
                                            country_name:req.body.country_name || " ",
                                            country_code:req.body.country_code || " "
                                        }

                                const result =await customerRegistration(datas);
                                let data="";

                                if(result=='true')
                                {
                                    const customer = await searchCustomer(req.body.contact_no);
                                    console.log("results returned by",customer)
                                    if (customer.rows.length==0) {
                                        res.status(500).send({data:{},"status":false,"message":"Something went wrong."})
                                    }else{
                                        data={
                                            user_id:customer.rows[0].id,
                                            email_address:customer.rows[0].email_address,
                                            contact_no:customer.rows[0].contact_no,
                                            jwt_token:customer.rows[0].jwt_token,
                                        }
                                        const jwt_token = jwt.sign({ id: customer.rows[0].id}, "mycustomersecretkey")
                                        data.jwt_token=jwt_token;
                                        let user_location;
                                if(req.body.long && req.body.lat)
                                        user_location= `SRID=4326;POINT(${req.body.long} ${req.body.lat})`;
                                else
                                        user_location= `SRID=4326;POINT(0.00 0.00)`;
                                        let created_at = moment(new Date());
                                        created_at= moment.utc(created_at).format('l LT')
                                        let updated_at=created_at;
                                
                                let login={
                                            jwt_token:jwt_token,
                                            user_id:customer.rows[0].id,
                                            updated_at:updated_at ,
                                            device_type:req.body.device_type || "",
                                            user_location:user_location || `SRID=4326;POINT(0.00 0.00)`,
                                            fcm_token:req.body.fcm_token || " ",
                                            login_type:req.body.login_type || " ",
                                            app_version:req.body.app_version || " ",
                                            device_name:req.body.device_name || " ",
                                            device_os:req.body.device_os || " ",
                                            country_name:req.body.country_name || " ",
                                            country_code:req.body.country_code || " "
                                        }
                                        await updateCustomertoken(login);
                                    }

                                    res.status(200).send({data:data,"status":true,"message":"Profile successfully Created"})
                                }else{
                                    res.status(500).send({data:{},"status":false,"message":"Something went wrong"})
                                }   
                            }else{
                                
                                const jwt_token = jwt.sign({ id: customer.rows[0].id}, "mycustomersecretkey")
                                let user_location;
                                if(req.body.long && req.body.lat)
                                        user_location= `SRID=4326;POINT(${req.body.long} ${req.body.lat})`;
                                else
                                        user_location= `SRID=4326;POINT(0.00 0.00)`;
                                        let created_at = moment(new Date());
                                        created_at= moment.utc(created_at).format('l LT')
                                        let updated_at=created_at;
                                
                            
                                let login={
                                            jwt_token:jwt_token,
                                            id:customer.rows[0].id,
                                            updated_at:updated_at ,
                                            device_type:req.body.device_type || "",
                                            user_location:user_location || `SRID=4326;POINT(0.00 0.00)`,
                                            fcm_token:req.body.fcm_token || " ",
                                            login_type:req.body.login_type || " ",
                                            app_version:req.body.app_version || " ",
                                            device_name:req.body.device_name || " ",
                                            device_os:req.body.device_os || " ",
                                            country_name:req.body.country_name || " ",
                                            country_code:req.body.country_code || " "
                                        }
                                        await updateCustomertoken(login);
                                        res.status(200).send({data:{ id:customer.rows[0].id,token:jwt_token,email_address:customer.rows[0].email_address,contact_no:customer.rows[0].contact_no },status:true,message:"Profile Already Exist.."})
                            }
                    }else{
                        res.status(200).send({data:{},"status":false,"message":"Missing Required Fileds"})
                    }
            }else if(req.body.login_type=='2'){ //google



            }else if(req.body.login_type=='3'){ //facebook


            }else{
                res.status(200).send({data:{},"status":false,"message":"Missing Required Fileds"})
            }
    
}catch(e){
    res.status(500).send({data:{},"status":false,"message":"Something went Wrong try catch"})
}



    
}


const register = async (req, res, next) => {
    if (req.body.contact_no && req.body.user_password) {
        const hashed = await bcrypt.hash(req.body.user_password, 10);
        let user_location;
        if(req.body.long && req.body.lat)
                user_location= `SRID=4326;POINT(${req.body.long} ${req.body.lat})`;
        else
                user_location= `SRID=4326;POINT(0.00 0.00)`;

                let created_at = moment(new Date());
                created_at= moment.utc(created_at).format('l LT')
                let updated_at=created_at;

        let datas={
            first_name:req.body.first_name || " ",
            last_name:req.body.last_name || " ",
            email_address:req.body.email_address || " ",
            user_type:"customer",
            profile_picture:req.body.profile_picture || "",
            contact_no:req.body.contact_no || "",
            soft_deleted:req.body.soft_deleted ,
            otp:req.body.otp || "",
            updated_at:updated_at ,
            created_at:created_at,
            device_type:req.body.device_type || "undefined",
            user_location:user_location || `SRID=4326;POINT(0.00 0.00)`,
            id_card_number:req.body.id_card_number || "",
            user_password: hashed,
            fcm_token:req.body.fcm_token || " ",
            login_type:req.body.login_type || " ",
            app_version:req.body.app_version || " ",
            device_name:req.body.device_name || " ",
            device_os:req.body.device_os || " ",
            country_name:req.body.country_name || " ",
            country_code:req.body.country_code || " ",
        }
        
        const result =await customerRegistration(datas);
        
        let data="";
        if(result=='true')
        {
            const customer = await searchCustomer(req.body.contact_no);
            console.log("results returned by",customer)
            if (customer.rows.length==0) {
                res.status(500).send({data:{},"status":false,"message":"login to get details."})
            }else{
                data={
                    user_id:customer.rows[0].id,
                    first_name:customer.rows[0].first_name,
                    last_name:customer.rows[0].last_name,
                    email_address:customer.rows[0].email_address,
                    contact_no:customer.rows[0].contact_no,
                    jwt_token:customer.rows[0].jwt_token,
                }
                const jwt_token = jwt.sign({ id: customer.rows[0].id,email_address:customer.rows[0].email_address}, "mycustomersecretkey")
                let login={
                    jwt_token:jwt_token,
                    id:customer.rows[0].id
                }
                data.jwt_token=login.jwt_token;
                await updateCustomertoken(login);
            }

            res.status(200).send({data:data,"status":true,"message":"registration successfull"})
        }else{
            res.status(500).send({data:{},"status":false,"message":"Something went wrong"})
        }

    } else {
        res.status(200).send({data:{},"status":false,"message":"Missing Required Fileds"})
    }
}


const logout = async (req, res, next) => {
    console.log("User ID", req.body.user_id);
 
    console.log(req.customer)
    try{
        let response=await customerLogout(req.body.user_id);
        if(response==true)
            res.status(200).send({data:{id:req.body.user_id},status:true, message: 'User is Successfully logged out' })
        else
        throw new Error("Something went Wrong")
    }catch(err)  {
        res.status(500).send({data:{},status:false, message: 'Some thing went wrong.' })
    }

 
     
}

const authenticate = (req, res, next) => {
    console.log(req.customer)
    try{
        res.status(200).send({data:{id:req.body.user_id},status:true, message: 'User is authorized' })
    }catch(err)  {
        res.status(500).send({data:{},status:false, message: 'Some thing went wrong.' })
    }
}


const verifyOTP = async (req, res, next) => {
    const otp = req.body.otp;
    const customer = await getUserProfile(req.body.user_id);

    if (customer.rows.length==0) {
        res.status(200).send({data:{},"status":false,"message":"user not found"})
    }else{
        let data={
            user_id:customer.rows[0].id,
            first_name:customer.rows[0].first_name || " ",
            last_name:customer.rows[0].last_name || " ",
            email_address:customer.rows[0].email_address || " ",
            profile_picture:customer.rows[0].profile_picture || "",
            contact_no:customer.rows[0].contact_no || "",
            soft_deleted:customer.rows[0].soft_deleted ,
            otp:customer.rows[0].otp || "",
            updated_at:customer.rows[0].updated_at ,
            created_at:customer.rows[0].created_at,
            device_type:customer.rows[0].device_type || "",
            user_location: customer.rows[0].user_location || "0.00 0.00",
            id_card_number:customer.rows[0].id_card_number || "",
            fcm_token:customer.rows[0].fcm_token || " ",
            login_type:customer.rows[0].login_type || " ",
            app_version:customer.rows[0].app_version || " ",
            device_name:customer.rows[0].device_name || " ",
            device_os:customer.rows[0].device_os || " ",
            country_name:customer.rows[0].country_name || " ",
            country_code:customer.rows[0].country_code || " "
        }
        if (otp == "1111") {
            return res.status(200).send({data:{data},status:true,message:"otp matched"});
        } else {
            return res.status(200).send({data:{},status:false,message:"otp does not match"});
    
        }

    }

}

const sendOtp = async (req, res, next) => {
    let user_id=req.body.user_id;
    var otp = Math.floor(1000 + Math.random() * 9000);

    try{
        let resp=await updateOtp({user_id,otp});

        if(resp=="true")
        {
            return res.status(200).send({data:{user_id:user_id},status:true,message:"otp has been sent."});

        }else{
            return res.status(500).send({data:{},status:false,message:"something went wrong."});
        }

    }catch(e){
        return res.status(500).send({data:{},status:false,message:"something went wrong."});
    }
}


// const forgot = async (req, res, next) => {
//     const customer = await Customer.findOne({ email: req.body.email });
//     if (!customer)
//         return res.status(400).send("email doesn't exist");
//     customer.otp = Math.floor(1000 + Math.random() * 9000)
//     await sendEmail(customer.email, "reset password for dukan app", `you can use the code below to reset your dukan app password ${customer.otp}`);
//     await customer.save()
//     res.send("password reset link sent to your email account");
// }
// const reset = async (req, res, next) => {
//     const otp = req.body.otp;
//     const email = req.body.email;
//     const password = req.body.password;
//     if (otp != 1111) {
//         const customer = await Customer.findOne({ otp, email });
//         if (!customer)
//             return res.status(401).send("otp does not match");
//         const hashed = await bcrypt.hash(password, 10)
//         customer.password = hashed
//         customer.otp = 1111;
//         await customer.save();
//         res.status(200).send("password changed")
//     } else {
//         return res.status(401).send("otp does not match");

//     }

// }
// module.exports = { login, register, forgot, reset, logout, authenticate, verifyOTP }
module.exports = { register,login,authenticate,verifyOTP,logout,sendOtp }