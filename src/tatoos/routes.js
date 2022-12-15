const express = require("express")
const route = express.Router()

const tattooController = require('./controller/tatooController') 
const upload= require('../../helper/imageUploader');

// const {auth,verifyOrigin} = require("../../helper/auth")

route.post('/add-taattos',upload.fields([{name: 'img1'}, {name: 'img2'},{name: 'img3'}, {name: 'img4'},{name: 'img5'}]),tattooController.addTatoo)
route.post('/get-taatoo-by-pagination',tattooController.getTaatoos)
route.post('/get-color-code',tattooController.getColorCode)

module.exports = route
