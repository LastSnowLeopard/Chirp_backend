const express = require("express")
const route = express.Router()

const { Create_CompanyDetails, Create_CompanyDetails_ran, getallCompayDetails,Update_CompanyDetails,Delete_CompanyDetails } = require('./controller/clientsController')

const {auth,verifyOrigin} = require("../../helper/auth")

route.post('/get-all-company-details',getallCompayDetails )
///route.post('/createrow/:id',Create_CompanyDetails )
route.post('/createCompanyDetails',Create_CompanyDetails )
route.post('/createCompanyDetails_ran',Create_CompanyDetails_ran )


route.post('/UpdateCompanyDetails',Update_CompanyDetails )
route.post('/DeleteCompanyDetails',Delete_CompanyDetails )

module.exports = route