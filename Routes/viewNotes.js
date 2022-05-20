// add the patient router
import express from 'express';
const viewNotesRouter = express.Router()

// connect to the controller
import {
    viewNotes,
    getDataById
} from "../Controllers/userController.js";

// process routes by calling controller functions
// Send data into AllPatients Data
viewNotesRouter.get('/', (req, res) => viewNotes(req, res))


// add a route to handle the GET request for one data instance
viewNotesRouter.get('/:username', (req, res) => getDataById(req, res))

// export the router
export default viewNotesRouter;
