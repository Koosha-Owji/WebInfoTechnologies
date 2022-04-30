import express from "express";
const glucoseRouter = express.Router();

import {
    create_glucose,
    get_one_glucose,
    getOne,
    //getPatientHome
} from "../Controllers/glucoseController.js";

glucoseRouter.post("/patient-home",(res,req) => {
    create_glucose(res,req)
    //res.setEncoding(get_one_glucose)
});
glucoseRouter.get("/getOne",getOne);
glucoseRouter.get('/patient-home', (req,res) => {
    res.render('patient-home.hbs', {data: {"glucoseLevel" : null}})
});


export default glucoseRouter;
