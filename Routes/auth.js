import passport from "passport";
import express from "express";
import { getUserByUsername } from "../Controllers/userController.js";

//const passport = require('passport')
//const express = require('express')
const router = express.Router()

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    // If user is not authenticated via passport, redirect to login page
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    // Otherwise, proceed to next middleware function
    return next()
}
const hasRole = (thisRole) => {
    return (req, res, next) => {
        if (req.user.role == thisRole) 
            return next()
        else {
            res.redirect('/')
        }
    }    
}

// Main page which requires login to access
// Note use of authentication middleware here
router.get('/', isAuthenticated, (req, res) => {
    if (req.user.role === 'Clinician') {
        res.render('clinicianFunctionality.hbs', {user: req.user});
    }
    else {
        //res.render('patient-home.hbs', {user: req.user})
        getUserByUsername(req,res)
    }
})

// Login page (with failure message displayed upon login failure)
router.get('/login', (req, res) => {
    res.render('login', { flash: req.flash('error'), title: 'Login' })
})

// Handle login
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/', failureRedirect: '/login', failureFlash: true
    }),
    (req, res) => {
        res.redirect('/')
    }
)

// Handle logout
router.post('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})


// Rough Implementation of Dashboard
import patientData from "./patientData.js";
router.use('/hardData', patientData)

// Rough Implementation of Dashboard
import supportMessage from "./writeSupportMessage.js";
router.use('/supportMessages', supportMessage)

// Rough Implementation of About Diabetes
import aboutDiabetes from "./aboutDiabetes.js";
router.use('/aboutDiabetes', aboutDiabetes)

// Rough Implementation of About Diabetes
import aboutUs from "./aboutUs.js";
router.use('/aboutUs', aboutUs)

//module.exports = router
export default router;