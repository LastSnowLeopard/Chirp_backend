const express = require("express")
const route = express.Router()

const tattooController = require('./controller/tatooController') 
const upload= require('../../helper/imageUploader');

// const {auth,verifyOrigin} = require("../../helper/auth")

route.post('/add-taattos',upload.fields([{name: 'img1'}, {name: 'img2'},{name: 'img3'}, {name: 'img4'},{name: 'img5'}]),tattooController.addTatoo)
route.post('/archive-taatoo',upload.fields([{name: 'img1'}, {name: 'img2'},{name: 'img3'}, {name: 'img4'},{name: 'img5'}]),tattooController.archiveTatoo)
route.post('/get-taatoo-by-pagination',tattooController.getTaatoos)
route.post('/get-taatoo-by-id-pagination',tattooController.getTaatoosById)
route.post('/get-taatoo-detail-by-id',tattooController.getTaatoosdetailById)
route.post('/get-others-tagged-taatoo-by-id-pagination',tattooController.getTaggedTaatoosById)
route.post('/like-taatoos',tattooController.likeTaatoos)

route.post('/get-color-code',tattooController.getColorCode)
// apis for admin

route.post('/get-stats',tattooController.getstats)
route.get('/get-users',tattooController.getUsers)
route.post('/get-creator',tattooController.getCreator)



module.exports = route
