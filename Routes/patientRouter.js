// add the patient router
import express from 'express';
const patientRouter = express.Router()

// connect to the controller
import {
    get_one_glucose
} from "../Controllers/glucoseController.js";

import {
    getUserByUsername,
    engagementRate,
    getProfile,
    update_password
} from "../Controllers/userController.js";

// process routes by calling controller functions
//patientRouter.get('/', (req, res) => get_one_glucose(req, res))

patientRouter.get('/', (req,res) => getUserByUsername(req,res) )
// export the router

patientRouter.get('/leaderboard', (req,res) => engagementRate(req,res) )
patientRouter.get('/Profile', (req,res) => getProfile(req,res))
patientRouter.post('/updatePass', (req,res) => update_password(req,res))


export default patientRouter;
