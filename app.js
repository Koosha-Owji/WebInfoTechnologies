import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import exphbs from 'express-handlebars';
import dotenv from "dotenv";
import flash from 'express-flash';
import session from 'express-session';
import Handlebars from 'handlebars';
import {allowInsecurePrototypeAccess} from '@handlebars/allow-prototype-access';

import {glucoseModel} from "./Models/Glucose.js";


if (process.env.NODE_ENV !== 'production') { 
  dotenv.config() 
} 

import glucoseRouter from "./Routes/Glucose.js";
import medicalDataRouter from "./Routes/medicalDataRouter.js";

import patientRouter from "./Routes/patientRouter.js";
import clinicianRouter from "./Routes/clinician.js";

const app = express();
app.use(express.static('public'))
app.use(express.json({ limit: '30mb', extended: true }))
app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use("/", glucoseRouter);
app.use("/", medicalDataRouter);

app.use("/", clinicianRouter);
app.engine('hbs', exphbs.engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars), // configure Handlebars
  defaultlayout: 'main',
  extname: 'hbs',
  helpers :{
      isGreater: (x,y) => x > y,
      isLess: (x,y) => x < y,
      equalString: (s1,s2) => s1 == s2,
      // Try to find the most recent data. Using helper function

      // this is just for testing 
      dateToday: () => {
        const today = new Date()
        return today.getDate();
      },
      returnFalse: () => false,
      //checks if data was entered today
      enteredToday: (date) => {
        const today = new Date()
        // checking month for now becuase time zone is messing up the date
        return date.getDate() == today.getDate();
          //date.getMonth() == today.getMonth() &&
          //date.getFullYear() == today.getFullYear()
      },

      getEngRate: (pId, dateRegistered) => {
        const msInDay = 1000 * 60 * 60 * 24
        const today = new Date()
        const diff = today - dateRegistered
        const daysRegisteredFor = Math.floor(diff / msInDay)

        //const allDates = glucoseModel.find({patientId: pId}, {dateTime: true} ).distinct().count()
        return daysRegisteredFor;

        //return daysRegisteredFor / allDates * 100;

      }
  }
}))
// set Handlebars view engine
app.set('view engine', 'hbs')


// Flash messages for failed logins, and (possibly) other success/error messages
app.use(flash())

// Track authenticated users through login sessions
app.use(
  session({
    // The secret used to sign session cookies (ADD ENV VAR)
    secret: process.env.SESSION_SECRET || 'sugardoctor123',
    name: 'SugarDoctor', // The cookie name (CHANGE THIS)
    saveUninitialized: false,
    resave: false,
    proxy: process.env.NODE_ENV === 'production',
    cookie: {
      sameSite: 'strict',
      httpOnly: true,
      secure: app.get('env') === 'production',
      maxAge: 24 * 60 * 60 * 1000
    },
  })
)

if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // Trust first proxy
}

// Initialise Passport.js
import passport from "./passport.js";
app.use(passport.authenticate('session'))

// Load authentication router
import authRouter from "./Routes/auth.js";
import { all } from "express/lib/application";
app.use(authRouter)

app.use(express.static('public'))
// send HTTP requests to router
app.use('/', patientRouter)



//const CONNECTION_URL = process.env.CONNECTION_URL;
const CONNECTION_URL = 'mongodb+srv://WebInfoTech:Webinfotech@cluster0.r8yef.mongodb.net/WebInfoTech?retryWrites=true&w=majority'
const PORT = process.env.PORT|| 5000;


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

//mongoose.set('useFindAndModify', false);