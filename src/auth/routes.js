const express = require("express")
const route = express.Router()

const authController = require('./controller/authController')

// const {auth,verifyOrigin} = require("../../helper/auth")



route.post('/user-registration',authController.userRegistration)
route.post('/verify-otp',authController.verifyOTP)
route.post('/login',authController.getLogin)
route.post('/creator-registration',authController.CreatorRegistration)
route.post('/logout',authController.logOut)
route.post('/forget-password',authController.ForgetPassword);
route.post('/reset-password',authController.reset_password);
route.post('/updateUser',authController.updateuser)
// route.post('/deleteUser',authController.deleteuser)

module.exports = route