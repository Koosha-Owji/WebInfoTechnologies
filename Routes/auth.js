import passport from "passport";
import express from "express";
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

// Main page which requires login to access
// Note use of authentication middleware here
router.get('/', isAuthenticated, (req, res) => {
    res.render('home', { title: 'Express', user: req.user })
})

// Login page (with failure message displayed upon login failure)
router.get('/login', (req, res) => {
    res.render('login', { flash: req.flash('error'), title: 'Login' })
})

// Handle login
router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/', failureRedirect: '/login', failureFlash: true
    })
)

// Handle logout
router.post('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

//module.exports = router
export default router;