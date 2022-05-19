// add the patient router
import express from 'express';
const writeSupportMessageRouter = express.Router()

// connect to the controller
import {
    writeSupportMessage
} from "../Controllers/userController.js";

// process routes by calling controller functions
// Send data into AllPatients Data
writeSupportMessageRouter.get('/', (req, res) => writeSupportMessage(req, res))




// export the router
export default writeSupportMessageRouter;
