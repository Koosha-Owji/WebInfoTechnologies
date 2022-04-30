import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import exphbs from 'express-handlebars';

import glucoseRouter from "./Routes/Glucose.js";
import patientRouter from "./Routes/patientRouter.js";

const app = express();
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use("/", glucoseRouter);

//app.use("/glucose", glucoseRouter);
app.engine('hbs', exphbs.engine({ // configure Handlebars
  defaultlayout: 'main',
  extname: 'hbs',
  helpers :{
      isGreater: (x,y) => x > y,
      isLess: (x,y) => x < y,
      subToday: (x) => x != null

    }
}))
app.set('view engine', 'hbs')
// connect to router

// send HTTP requests to router
app.use('/', patientRouter)

const CONNECTION_URL = 'mongodb+srv://WebInfoTech:Webinfotech@cluster0.r8yef.mongodb.net/WebInfoTech?retryWrites=true&w=majority'
const PORT = process.env.PORT|| 5000;


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

//mongoose.set('useFindAndModify', false);