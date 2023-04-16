const express = require("express")
const Router = express.Router()

const dataController = require('./controller/dataController') 
const upload= require('../../helper/imageUploader');

// const {auth,verifyOrigin} = require("../../helper/auth")

Router.post('/add-hobby-in-list',dataController.addHobbyInList)

Router.get('/get-hobby-list',dataController.getHobbyList)

Router.get('/get-events-list',dataController.getEventList)
Router.get('/get-feelings-list',dataController.getFeelingList)

module.exports = Router
