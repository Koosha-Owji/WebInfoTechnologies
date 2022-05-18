// add the patient router
import express from 'express';
const aboutDiabetesRouter = express.Router()

// connect to the controller
import {
    getAboutUs
} from "../Controllers/generalController.js";

// process routes by calling controller functions
aboutDiabetesRouter.get('/', (req, res) => getAboutUs(req, res))

// export the router
export default aboutDiabetesRouter;
