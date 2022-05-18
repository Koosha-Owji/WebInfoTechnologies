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

glucoseRouter.get('/test', (req,res) => res.render('test.hbs') )

export default glucoseRouter;
