// add the patient router
import express from 'express';
const writeSupportMessageRouter = express.Router()

// connect to the controller
import {
    submitSupportMessage,
    writeSupportMessage
} from "../Controllers/userController.js";

// process routes by calling controller functions
// Send data into AllPatients Data
writeSupportMessageRouter.get('/', (req, res) => writeSupportMessage(req, res))
writeSupportMessageRouter.post("/submitSupportMessage",(res,req) => {
    submitSupportMessage(res,req)
});



// export the router
export default writeSupportMessageRouter;

