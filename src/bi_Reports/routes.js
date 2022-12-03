const express = require("express")
const route = express.Router()

const {Report_CompanyDetails } = require('./controller')

const {auth,verifyOrigin} = require("../../helper/auth")

route.post('/CompanyReportsDetails',Report_CompanyDetails )
module.exports = route