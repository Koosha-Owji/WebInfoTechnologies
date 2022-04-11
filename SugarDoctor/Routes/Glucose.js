import express from "express";
const glucoseRouter = express.Router();

import {
    create_glucose,
    get_one_glucose
} from "../Controllers/glucoseController.js";

glucoseRouter.post("/add",create_glucose);
glucoseRouter.get("/getOne",get_one_glucose);

export default glucoseRouter;
