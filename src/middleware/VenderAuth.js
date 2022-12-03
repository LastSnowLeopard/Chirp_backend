const jwt = require('jsonwebtoken')
const {checkifuserexist}=require('../service/vendor');


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

module.exports = {checkifexist}

