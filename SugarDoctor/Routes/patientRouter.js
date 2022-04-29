// add our router
import express from 'express';
const patientRouter = express.Router()

// express-validator, to validate user data in forms
//const expressValidator = require('express-validator')

// connect to controller
import  {
    getAllPatientData,
    getPatientHome
 } from '../controllers/patientController.js';

// process routes by calling controller functions
patientRouter.get('/', (req, res) => getAllPatientData(req, res))
patientRouter.get('/patient-home', (req, res) => getPatientHome(req, res))

//foodRouter.get('/foods/:id', (req, res) => foodController.getOneFood(req, res))
//foodRouter.post('/search', expressValidator.body('foodName').isAlpha().optional({checkFalsy: true}), (req, res) => foodController.searchFoods(req, res))  // includes validation of user input


// export the router
export default patientRouter;
