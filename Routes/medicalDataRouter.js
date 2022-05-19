import express from "express";
const medicalDataRouter = express.Router();

import {
    createData
} from "../Controllers/medicalDataController.js";

medicalDataRouter.post("/newData",(res,req) => {
    createData(res,req)
});
//medicalDataRouter.get("/testData",(req,res) => res.render('/testData.hbs') );
medicalDataRouter.get('/testData', (req,res) => res.render('testData.hbs') );


export default medicalDataRouter;
