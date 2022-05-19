import express from "express";
const glucoseRouter = express.Router();

import {
    create_glucose,
    get_one_glucose,
    getOne
} from "../Controllers/glucoseController.js";

glucoseRouter.post("/patient-home",(res,req) => {
    create_glucose(res,req), {layout: 'patientMain.hbs'}
});
glucoseRouter.get("/getOne",getOne);

//glucoseRouter.get('/testData', (req,res) => res.render('testData.hbs') );

export default glucoseRouter;
