const express = require("express")
const route = express.Router()

const dataController = require('./controller/dataController') 
const upload= require('../../helper/imageUploader');

// const {auth,verifyOrigin} = require("../../helper/auth")

route.post('/add-hobby-in-list',dataController.addHobbyInList)

route.get('/get-hobby-list',dataController.getHobbyList)

route.get('/get-events-list',dataController.getEventList)
route.get('/get-feelings-list',dataController.getFeelingList)

module.exports = route
