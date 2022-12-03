const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// const sendEmail = require('../../util/sendEmail')
// const { validationResult } = require('express-validator');
const {adminRegistration,searchadmin,updateadmintoken,adminLogout}=require('../../service/admin');


const login = async (req, res, next) => {
    const { contact_no, user_password } = req.body;
    console.log(req.body);
    if (contact_no && user_password) {
        const customer = await searchadmin( contact_no )
        if (customer.rows.length==0) {
            res.status(201).send({data:{},message:"customer does not exist",status:false})
        } else {
            const isPasswordMatch = await bcrypt.compare(user_password, customer.rows[0].user_password)
            if (!isPasswordMatch) {
                res.status(201).send({data:{},message:"Incorrect Password",status:false})
            } else if (
                customer.rows[0].disabled=='true'
            ) {
                res.status(200).send({data:{},status:false,message:"you can not login because your account is disabled contact to admin"})
            } else {
                const jwt_token = jwt.sign({ id: customer.rows[0].id,email_address:customer.rows[0].email_address}, "mycustomersecretkey")
                let login={
                    jwt_token:jwt_token,
                    id:customer.rows[0].id
                }
                await updateadmintoken(login);
                res.status(200).send({data:{ id:customer.rows[0].id,token:jwt_token,email_address:customer.rows[0].email_address },status:true,message:"Login Sucessfull"})
            }
        }
    } else {
        res.status(200).send({data:{},status:false,message:"fields are required"})
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
            user_type:"admin",
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
        
        const result =await adminRegistration(datas);
        
        let data="";
        if(result=='true')
        {
            const customer = await searchadmin(req.body.contact_no);
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
                await updateadmintoken(login);
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
        let response=await adminLogout(req.body.user_id);
        if(response==true)
            res.status(200).send({data:{id:req.body.user_id},status:true, message: 'Vendor is Successfully logged out' })
        else
        throw new Error("Something went Wrong")
    }catch(err)  {
        res.status(500).send({data:{},status:false, message: 'Some thing went wrong.' })
    }

}










// const authenticate = (req, res, next) => {
//     Vender.findById(req.vender._id, { full_Name: 1, email: 1, phone_Number: 1, tokens: 1, })
//         .then(data => {
//             res.send(data)
//         }).catch(err => {
//             console.log("err", err)
//             res.send(err)
//         })
// }
// const verifyOTP = async (req, res, next) => {
//     const otp = req.body.otp;
//     const email = req.body.email;
//     if (otp != 1111) {
//         const vender = await Vender.findOne({ otp, email });
//         if (!vender)
//             return res.status(401).send("otp does not match");
//         res.status(200).send("password reset link sent to your email account");
//     } else {
//         return res.status(401).send("otp does not match");

//     }
// }
// const forgot = async (req, res, next) => {
//     const vender = await Vender.findOne({ email: req.body.email });
//     if (!vender)
//         return res.status(400).send("email doesn't exist");
//     vender.otp = Math.floor(1000 + Math.random() * 9000)
//     await sendEmail(vender.email, "reset password for dukan app", `you can use the code below to reset your dukan app password ${vender.otp}`);
//     await vender.save()
//     res.send("password reset link sent to your email account");
// }
// const reset = async (req, res, next) => {
//     const otp = req.body.otp;
//     const email = req.body.email;
//     const password = req.body.password;
//     if (otp != 1111) {
//         const vender = await Vender.findOne({ otp, email });
//         if (!vender)
//             return res.status(401).send("otp does not match");
//         const hashed = await bcrypt.hash(password, 10)
//         vender.password = hashed
//         vender.otp = 1111;
//         await vender.save();
//         res.status(200).send("password changed")
//     } else {
//         return res.status(401).send("otp does not match");

//     }

// }
// module.exports = {  forgot, reset, logout, authenticate, verifyOTP }
module.exports = { register,login,logout}