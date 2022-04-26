import express from "express";
import mongoose from "mongoose";
import cors from 'cors';

import glucoseRouter from "./Routes/Glucose.js";

const app = express();
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use("/glucose", glucoseRouter);
const CONNECTION_URL = 'mongodb+srv://WebInfoTech:Webinfotech@cluster0.r8yef.mongodb.net/WebInfoTech?retryWrites=true&w=majority'
const PORT = process.env.PORT|| 5000;


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
