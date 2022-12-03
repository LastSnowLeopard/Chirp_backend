const express = require("express")
const route = express.Router()

const { getCompayDetails,getSystemSpecification } = require('./controller/dashboardController')

const {auth,verifyOrigin} = require("../../helper/auth")

route.post('/get-company-detail',getCompayDetails )

route.get('/getspecifications',getSystemSpecification )


module.exports = route