import patientData from '../Models/patientModel.js';

const getAllPatientData = (req, res) => {
    res.render('patientData.hbs',{data: patientData})
}

export default getAllPatientData