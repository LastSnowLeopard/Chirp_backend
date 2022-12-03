
const { sanitize } = require('express-validator');
const {Create_CompanyDetails_licence,getCompaniesDetail, CreateCompanyDetails,UpdateCompanyDetails,DeleteCompanyDetails}=require('../service/service');


const getallCompayDetails = async (req, res) => {
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

const Create_CompanyDetails  = async (req,res)=>
{    
    try {
        const company_uid = req.query.id; 
        const respond = await  CreateCompanyDetails(req.body)
        res.status(200).send({data:"Inserted Successfully",status:true,message:respond})        
    } catch (error) {
      res.status(400).send({message:error.message});  
    } 

 
    
   
}

const Update_CompanyDetails  = async (req,res)=>{
   try {
    const updaterespond = await UpdateCompanyDetails(req.body)
    res.status(200).send({message: updaterespond})   
   } catch (error) {
    
    res.status(400).send({message:error.message})
   }
      
}


const Delete_CompanyDetails  = async (req,res)=>{
   try {
    const respond = await DeleteCompanyDetails(req.body)
    res.status(400).send({message: respond})  
    
   } catch (error) {
    res.status(200).send({message: error.message})
   }
   
   
}
const Create_CompanyDetails_ran = async (req,res)=>{
    try {
        const respond = await Create_CompanyDetails_licence(req.body)
        res.status(200).send({message : respond})
            
    } catch (error) {
        res.status(400).send({message : error.message})
    }
}


/*

*/

module.exports = {Create_CompanyDetails_ran,getallCompayDetails,Update_CompanyDetails,Create_CompanyDetails,Delete_CompanyDetails}

