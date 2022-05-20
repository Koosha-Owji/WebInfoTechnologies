import express from "express";
const clinicianRouter = express.Router();

import {
    signup,
    updatePatientRequirements
} from "../Controllers/userController.js";

clinicianRouter.post("/clinicianFunctionality",(res,req) => {
    signup(res,req)
});
clinicianRouter.post("/updatePatientRequirements",(res,req) => {
    updatePatientRequirements(res,req)
});

export default clinicianRouter;

