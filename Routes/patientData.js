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
// Want to be able to write a note
patientDataRouter.get('/:id', (req, res) => {
    getDataById(req, res),
    writeNote(res,req)
});



// export the router
export default patientDataRouter;
