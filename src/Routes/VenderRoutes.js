const express = require("express")
// 
const { check } = require('express-validator');
// 
const route = express.Router()
const { login, register, forgot, reset, logout, authenticate, verifyOTP } = require('../Controller/venderControllers/venderAuthenticationController')
// const { getProducts, mutateProduct, deleteProduct, addProduct } = require('../Controller/venderControllers/productController')
// const { getCategories } = require("../Controller/adminControllers/adminCategoryController")
// const { addStore, getStores, mutateStore, deleteStore, } = require('../Controller/venderControllers/storeController')

const {auth,verifyOrigin} = require("../../helper/auth")
const {checkifexist} = require("../middleware/VenderAuth")

// authentication routes

route.post('/register',verifyOrigin,checkifexist, register)
route.get('/login',verifyOrigin, login)
route.get('/logout', auth, logout)


// route.get('/authenticate', auth, authenticate)
// route.post('/forgot', forgot)
// route.put('/reset', reset)
// route.get('/logout', auth, logout)
// route.get('/verifyOTP', verifyOTP)
// // fetch categories
// route.get('/category', auth, getCategories)
// // product routes
// route.post('/product', auth, addProductValidation, addProduct)
// route.get('/product', auth, getProducts)
// route.put('/product/:_id', auth, addProductValidation, mutateProduct)
// route.delete('/product/:_id', auth, deleteProduct)
// // store routes
// route.get('/store', auth, getStores)
// route.post('/store', auth, addStore)
// route.put('/store/:_id', auth, mutateStore)
// route.delete('/store/:_id', auth, deleteStore)
// // api resource in mongoose for node

module.exports = route