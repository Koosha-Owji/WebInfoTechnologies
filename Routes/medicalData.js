import express from "express";
const medicalDataRouter = express.Router();

import {
    create_data,
    getOne
} from "../Controllers/medicalDataController.js";

medicalDataRouter.post("/patient-home",(res,req) => {
    create_data(res,req)
});
medicalDataRouter.get("/getOne",getOne);

export default medicalDataRouter;
