// add the patient router
import express from 'express';
const patientRouter = express.Router()

// connect to the controller
import {
    get_one_glucose
} from "../Controllers/glucoseController.js";

import {
    getUserByUsername
} from "../Controllers/userController.js";

// process routes by calling controller functions
//patientRouter.get('/', (req, res) => get_one_glucose(req, res))

patientRouter.get('/', (req,res) => getUserByUsername(req,res) )
// export the router
export default patientRouter;
