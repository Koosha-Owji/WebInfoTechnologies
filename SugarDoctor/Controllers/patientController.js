import patientData from '../Models/patientModel.js';

export const getAllPatientData = (req, res) => {
    res.render('patientData.hbs',{data: patientData})
}


 export const getPatientHome = (req, res) => {
    res.render('patient-home.hbs',{data: patientData})
}

//export default getAllPatientData
