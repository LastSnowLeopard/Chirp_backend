const express = require("express")
const route = express.Router()

const { AlterDetails } = require('./controller')

route.post('/Handle_Report',  AlterDetails )
module.exports = route