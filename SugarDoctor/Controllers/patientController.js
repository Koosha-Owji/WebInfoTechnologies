import patientData from '../Models/patientModel.js';
//import get_one_glucose from '../Controllers/glucoseController.js'

export const getAllPatientData = (req, res) => {
    res.render('patientData.hbs',{data: patientData})
}


 export const getPatientHome = (req, res) => {
    res.render('patient-home.hbs',{data: patientData})
}

//export default getAllPatientData
