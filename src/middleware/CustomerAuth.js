const jwt = require('jsonwebtoken')
const {checkifuserexist}=require('../service/customer');


const checkifexist = async (req, res, next) => {
    if ( req.body.contact_no && req.body.user_password) {
 
        const result =await checkifuserexist(req.body.contact_no);
        if(result=='true')
        {
           next();
        }else{
            res.status(200).send({data:{contact_no:req.body.contact_no},status:false,message:"Phone Number Already Exist"})
        }

    } else {
        res.status(200).send({status:false,message:"Missing Required Fields"})
    }
}



// const auth = async(req, res, next) => {
//     if(req.header('Authorization')?.includes("Bearer ")){
//     const token = req.header('Authorization').replace('Bearer ', '')
//     if(token){
//         try {
//             const data = await jwt.verify(token, "mycustomersecretkey")
//             console.log("ddddata",data)
//             const customer = await Customer.findOne({ _id: data?._id, 'tokens.token': token })
//             if (!customer) {
//                 throw new Error("Not authorized to access this resource")
//             }
//             req.customer = customer
//             req.token = token
//             next()
//         } catch (error) {
//             res.status(401).send({ error })
//         }
//     }else{
//         res.status(401).send({ error: 'Invalid Token' })
//     }
// }else{
//     res.status(401).send({ error: 'Token type should be Bearer' })
// }
// }
module.exports = {checkifexist}