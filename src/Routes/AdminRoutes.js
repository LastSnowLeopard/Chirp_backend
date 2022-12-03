const express = require("express")
const route = express.Router()

const { login, register,forgot, reset, logout, authenticate, verifyOTP } = require('../Controller/adminControllers/adminAuthenticationController')
const { addCategory,getCategoryList, getcategories, mutateCategory, deleteCategory } = require('../Controller/adminControllers/adminCategoryController')
// const { getAllProducts, mutateProduct, deleteProduct, approveProduct } = require('../Controller/venderControllers/productController')
// const { getVenders, disableVender, deleteVender, enableVender } = require('../Controller/venderControllers/vendersController')
// const { getCustomers, disableCustomer, deleteCustomer, enableCustomer } = require('../Controller/CustomerControllers/customerController')

const {auth,verifyOrigin} = require("../../helper/auth")

const {checkifexist} = require("../middleware/AdminAuth")

// authentication routes
route.post('/register',verifyOrigin,checkifexist, register)
route.get('/login',verifyOrigin, login)
route.get('/logout', auth, logout)

// // category
route.post('/add-category',verifyOrigin, auth, addCategory)
route.get('/get-category-list',verifyOrigin, auth, getCategoryList)
route.get('/get-all-categories',verifyOrigin,auth,getcategories)
// route.put('/category/:_id', auth, mutateCategory)
// route.delete('/category/:_id', auth, deleteCategory)

// products
route.post('/add-product',verifyOrigin, auth, addCategory)

// authentication
// route.post('/register', register)
// route.get('/login', login)
// route.get('/authenticate', auth, authenticate)
// route.post('/forgot', forgot)
// route.put('/reset', reset)
// route.get('/logout', auth, logout)
// route.get('/verifyOTP', verifyOTP)
// // category
// route.post('/category', auth, addCategory)
// route.get('/category', auth, getCategories)
// route.put('/category/:_id', auth, mutateCategory)
// route.delete('/category/:_id', auth, deleteCategory)
// // product routes
// route.get('/product', auth, getAllProducts)
// route.put('/product/:_id', auth, mutateProduct)
// route.post('/approve/product/:_id', auth, approveProduct)
// route.delete('/product/:_id', auth, deleteProduct)
// // manage venders
// route.get('/vender', auth, getVenders)
// route.put('/vender/enable/:_id', auth, enableVender)
// route.put('/vender/disable/:_id', auth, disableVender)
// route.delete('/vender/:_id', auth, deleteVender)
// // manage customer
// route.get('/customer', auth, getCustomers)
// route.put('/customer/enable/:_id', auth, enableCustomer)
// route.put('/customer/disable/:_id', auth, disableCustomer)
// route.delete('/customer/:_id', auth, deleteCustomer)
module.exports = route