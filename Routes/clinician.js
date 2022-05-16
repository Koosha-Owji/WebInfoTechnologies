import express from "express";
const clinicianRouter = express.Router();

import {
    signup
} from "../Controllers/userController.js";

import {
    writeNote
} from "../Controllers/glucoseController.js";

clinicianRouter.post("/clinicianFunctionality",(res,req) => {
    signup(res,req),
    writeNote(res,req)
});
//glucoseRouter.get("/getOne",getOne);


export default clinicianRouter;
