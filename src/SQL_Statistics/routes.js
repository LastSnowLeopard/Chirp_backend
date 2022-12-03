const express = require("express")
const route = express.Router()
const {auth,verifyOrigin} = require("../../helper/auth")

// const { CheckDatabseStatistics } = require('./controller')
const Statistics = require('./controller')


route.get('/Database_Statistics',auth, Statistics)

module.exports = route