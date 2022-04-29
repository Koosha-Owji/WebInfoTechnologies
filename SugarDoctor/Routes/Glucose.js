import express from "express";
const glucoseRouter = express.Router();

import {
    create_glucose,
    get_one_glucose
    //getPatientHome
} from "../Controllers/glucoseController.js";

glucoseRouter.post("/addGlucose",(res,req) => create_glucose(res,req));
glucoseRouter.get("/getOne",get_one_glucose);
//glucoseRouter.get('/patient-home', (req, res) => getPatientHome(req, res))


export default glucoseRouter;
