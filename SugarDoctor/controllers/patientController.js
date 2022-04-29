const patientData = require('../models/patientModel')

const getAllPatientData = (req, res) => {
    res.render('patientData.hbs',{data: patientData})
}

module.exports = {
    getAllPatientData,
}