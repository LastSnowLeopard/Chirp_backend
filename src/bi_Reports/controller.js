
const { sanitize } = require('express-validator');
const {CompanyReportDetails}=require('./service');


const Report_CompanyDetails = async (req,res)=>{
    // // const {geographyOverview,mobile,portfolioReport,SalesReport}= req.body;
    var  keyarray = [];
    var valuearray= [];
    const {reports} = req.body;
    // Object.keys(reports);s
    keyarray = (Object.keys(reports))
    valuearray = (Object.values(reports))
    // console.log(keyarray)
    // console.log(valuearray)
    try
    {
   const respond = await  CompanyReportDetails(req.body,keyarray,valuearray)
   res.send({message: respond})  
    }catch(error)
    {
        res.status(400).send({message:error.message});
    }
 
}

/*

*/

module.exports = {Report_CompanyDetails }

