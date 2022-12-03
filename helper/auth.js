const jwt = require('jsonwebtoken')
const {authUser,getConfiguration}=require('./authService');


const auth = async(req, res, next) => {
    try{

            if(req.header('Authorization').includes("Bearer ")){
            const token = req.header('Authorization').replace('Bearer ', '')
            if(token){
                try {
                    const data = await jwt.verify(token, "mycustomersecretkey")
                    // console.log(data)
                    const customer = await authUser({ id: data.id, jwt_token: token })
                    // console.log(customer)
                    // console.log(data.id)
                    if (customer==false) {
                        throw new Error("Not authorized to access this resource")
                    }
                    req.body.user_id = data.id;
                    req.token = token
                    
                    next()
                } catch (error) {
                    // console.log(token)
                    res.status(400).send({data:{},status:false, message: 'Not authorized to access this resource' })
                }
            }else{
                res.status(401).send({data:{},status:false, message: 'Invalid Request without Token.' })
            }
        }else{
            res.status(401).send({data:{},status:false,message: 'Token type should be Bearer' })
        }
    }catch(e){
        res.status(401).send({data:{},status:false,message: 'something went wrong'})
    }
}


const verifyOrigin = async(req, res, next) => {

    let secret=req.header('secret') || " ";

    try{
        if(secret=='76JH76321adsE#@d'){
            console.log("Request is  from right origin")
            next();

        }else{
            console.log("Request is not from right origin")
            throw new Error("Request is not from right origin")
        }
    }catch(e){
        res.status(401).send({data:{},status:false,message: 'request origin is not verified'})
    }
}

const getConfig = async(req, res, next) => {
    try{

        let response=await getConfiguration();
        let data={};
       if(response.rows.length>0)
       {
            for(let i=0;i<response.rows.length;i++)
            {
                if(response.rows[i].parameter_name=='customer_app_version')
                    data.customer_app_version=response.rows[i].value;
                if(response.rows[i].parameter_name=='customer_app_version_code')
                    data.customer_app_version_code=response.rows[i].value;
                if(response.rows[i].parameter_name=='is_force_update')
                    data.is_fore_update=response.rows[i].value;
                if(response.rows[i].parameter_name=='maintinance')
                    data.maintinance=response.rows[i].value;
                if(response.rows[i].parameter_name=='is_clear_db_schema')
                    data.is_clear_db_schema=response.rows[i].value;
                if(response.rows[i].parameter_name=='search_radius')
                    data.search_radius=response.rows[i].value;
                if(response.rows[i].parameter_name=='app_secret')
                    data.app_secret=response.rows[i].value;
                if(response.rows[i].parameter_name=='google_api_key')
                    data.google_api_key=response.rows[i].value;
            }
            return res.status(200).send({data,status:true,message: 'Setting fetched'})

       }else{

          return res.status(200).send({data:{},status:false,message: 'Setting is empty'})
       }

    }catch(error){
        console.log(error)
        res.status(500).send({data:{},status:false,message: 'Some thing went wrong..'})
    }
}
module.exports = {auth,verifyOrigin,getConfig}