// add our router
const express = require('express')
const patientRouter = express.Router()

// express-validator, to validate user data in forms
//const expressValidator = require('express-validator')

// connect to controller
const patientController = require('../controllers/patientController.js')

// process routes by calling controller functions
patientRouter.get('/', (req, res) => patientController.getAllPatientData(req, res))
//foodRouter.get('/foods/:id', (req, res) => foodController.getOneFood(req, res))
//foodRouter.post('/search', expressValidator.body('foodName').isAlpha().optional({checkFalsy: true}), (req, res) => foodController.searchFoods(req, res))  // includes validation of user input

// export the router
module.exports = patientRouter
