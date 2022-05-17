import express from "express";
const glucoseRouter = express.Router();

import {
    create_data,
    get_one_glucose,
    getOne
} from "../Controllers/glucoseController.js";

glucoseRouter.post("/patient-home",(res,req) => {
    create_data(res,req)
});
glucoseRouter.get("/getOne",getOne);

export default glucoseRouter;
