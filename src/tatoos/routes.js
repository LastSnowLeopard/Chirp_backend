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

route.post('/read-comments',tattooController.ReadComments)
route.post('/write-comments',tattooController.WriteComments)




module.exports = route
// CREATE TABLE `taatoo_application`.`comments` ( `id` INT(5) NOT NULL AUTO_INCREMENT , `taatoo_id` INT(5) NULL DEFAULT NULL , `added_by` VARCHAR(5) NULL DEFAULT NULL , `comment` VARCHAR(500) NULL DEFAULT NULL , `created_at` INT(40) NULL DEFAULT NULL , `user_id` INT(10) NULL DEFAULT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;