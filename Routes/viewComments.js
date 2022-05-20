// add the patient router
import express from 'express';
const viewCommentsRouter = express.Router()

// connect to the controller
import {
    viewComments
} from "../Controllers/userController.js";

// process routes by calling controller functions
// Send data into AllPatients Data
viewCommentsRouter.get('/', (req, res) => viewComments(req, res))



// export the router
export default viewCommentsRouter;
