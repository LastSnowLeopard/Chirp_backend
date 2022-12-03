const express = require("express")
const route = express.Router()
const { login, register, forgot, reset, logout, authenticate,sendOtp, verifyOTP} = require('../Controller/CustomerControllers/customerAuthenticationController')
const { getcategories} = require('../Controller/CustomerControllers/customerController')
const {checkifexist} = require("../middleware/CustomerAuth")
const {auth,verifyOrigin,getConfig} = require("../../helper/auth")

route.post('/register',verifyOrigin,checkifexist, register)
route.post('/login',verifyOrigin,login)
route.get('/authentication', auth,authenticate)
// route.post('/forgot', forgot)
// route.put('/reset', reset)
route.get('/send-otp', verifyOrigin,auth, sendOtp)
route.put('/logout', verifyOrigin,auth, logout)
route.post('/verifyOTP',verifyOrigin,auth,verifyOTP)
route.get('/getcategories',verifyOrigin,auth,getcategories)

//get settings
route.get('/get-config', verifyOrigin, getConfig)

module.exports = route