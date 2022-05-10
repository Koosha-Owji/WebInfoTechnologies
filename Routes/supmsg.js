import express from "express";
const supmsgRouter = express.Router();

import {
    create_supmsg,
    get_one_supmsg,
    getOne
} from "../Controllers/supmsgController.js";

glucoseRouter.post("/getOne",(res,req) => {
    create_supmsg(res,req)
});
glucoseRouter.get("/patient-home",getOne);

export default supmsgRouter;
