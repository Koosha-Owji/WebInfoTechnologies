const express = require('express')

const demoRouter = express.Router()

const demoController = require('../controllers/demoController')

demoRouter.get('/', demoController.getAllDemoData)
demoRouter.get('/:id', demoController.getDataById)
module.exports = demoRouter