// Express stuff
const express = require('express')
const app = express()
//app.use(express.json())  
app.use(express.urlencoded({ extended: true })) // replaces body-parser
app.use(express.static('public'))	// define where static assets live

// use(express.static('public')) // define where static assets live
const exphbs = require('express-handlebars') // include Handlebars module
app.engine('hbs', exphbs.engine({ // configure Handlebars
    defaultlayout: 'main',
    extname: 'hbs',
    helpers :{
        isGreater: (x,y) => x > y,
        isLess: (x,y) => x < y
    }
}))
app.set('view engine', 'hbs')
// connect to router
const patientRouter = require('./routes/patientRouter.js')


// send HTTP requests to router
app.use('/', patientRouter)

// start server and listen for HTTP requests
// Tells th app to listen on port 3000 and log that information to the console.
app.listen(3000, () => {
    console.log('Demo app is listening on port 3000!')
});