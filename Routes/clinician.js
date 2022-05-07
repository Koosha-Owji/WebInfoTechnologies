import express from "express";
const clinicianRouter = express.Router();

import {
    signup
} from "../Controllers/userController.js";

clinicianRouter.post("/clinicianFunctionality",(res,req) => {
    signup(res,req)
});
//glucoseRouter.get("/getOne",getOne);

export default clinicianRouter;
