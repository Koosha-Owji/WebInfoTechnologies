// add the patient router
import express from 'express';
const patientDataRouter = express.Router()

// connect to the controller
import {
    getAllPatientsData,
    getDataById
} from "../Controllers/userController.js";

// process routes by calling controller functions
patientDataRouter.get('/', (req, res) => getAllPatientsData(req, res))

// add a route to handle the GET request for one data instance
//patientDataRouter.get('/:id', userController.getDataById)
patientDataRouter.get('/:username', (req, res) => getDataById(req, res))

// export the router
export default patientDataRouter;
