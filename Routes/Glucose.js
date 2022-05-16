import express from "express";
const glucoseRouter = express.Router();

import {
    create_glucose,
    get_one_glucose,
    getOne
} from "../Controllers/glucoseController.js";

glucoseRouter.post("/patient-home",(res,req) => {
    create_glucose(res,req)
});
glucoseRouter.get("/getOne",getOne);
glucoseRouter.get('/patient-home', (req,res) => {
    res.render('patient-home.hbs', {data: {"glucoseLevel" : null, layout: 'patientMain.hbs'}})
});

glucoseRouter.get('/registerPatient', (req,res) => res.render('registerPatient.hbs', {layout: 'patientMain.hbs'} ))
glucoseRouter.get('/login', (req,res) => res.render('login.hbs'))

export default glucoseRouter;
