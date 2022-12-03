
const {getCompaniesDetail,SytemSpecification}=require('../service/service');


const getCompayDetails = async (req, res) => {
    try{
        const companyDetails = await getCompaniesDetail();
        if (companyDetails.length==0) {
            res.status(200).send({data:{},message:"Zero Company Details Found",status:true})
        } else {
            res.status(200).send({data:companyDetails,message:"Data Found",status:false})
        }
    }catch(e){
        res.status(500).send({data:{},status:false,message:"System Error"})
    }
}
const getSystemSpecification = async (req, res) => {
    try{
        const system = await SytemSpecification();
        res.status(200).send({message : system});
    }catch(e){
        res.status(500).send({data:{},status:false,message:"System Error"})
    }
}


module.exports = {getCompayDetails, getSystemSpecification }