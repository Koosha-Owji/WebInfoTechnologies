// add the patient router
import express from 'express';
const aboutDiabetesRouter = express.Router()

// connect to the controller
import {
    getAboutDiabetes
} from "../Controllers/generalController.js";

// process routes by calling controller functions
aboutDiabetesRouter.get('/', (req, res) => getAboutDiabetes(req, res))

// export the router
export default aboutDiabetesRouter;
