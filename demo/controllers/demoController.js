const demoData = require('../models/demoModel')

const getAllDemoData = (req, res) => {
    res.send(demoData)
}

const getDataById = (req, res) => {
    const data = demoData.find(data => data.id === req.params.id)

    if (data) {
        res.send(data)
    } else {
        res.sendStatus(404)
    }
}

module.exports = {
    getAllDemoData,
    getDataById
}

