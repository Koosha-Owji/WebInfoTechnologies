const express = require('express')

const app = express()

app.get('/', (req,res) => {
    res.send(' Our demo app is working!')
});

// Tells th app to listen on port 3000 and log that information to the console.
app.listen(3000, () => {
    console.log('Demo app is listening on port 3000!')
});

const demoRouter = require('./routes/demoRouter')

app.use('/demo-management', demoRouter)